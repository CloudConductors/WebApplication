from flask import Blueprint, render_template, jsonify, request, session
import os
import boto3
from boto3.dynamodb.conditions import Attr, And
from botocore.exceptions import ClientError
import json
import bcrypt
import base64
import uuid
from datetime import datetime
from flask_apscheduler import APScheduler
# ~~~~~~~~~~~~~~~~~~~~~~ Dependencies from other files ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
from api.aws import dynamodb, table, schedule_table, cc_trains # AWS-related resources
# from api.machine_learning import gen_schedule # Machine learning-related function

# ~~~~~~~~~~~~~~~~~~~~~~ Setting Up the App ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
frontend_bp = Blueprint('frontend', __name__) #used to setup file to be imported to flask

# ~~~~~~~~~~~~~~~~~~~~~~ Sessions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
frontend_bp.secret_key = os.urandom(24)

# ~~~~~~~~~~~~~~~~~~~~~~ Assisting Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# Function to Hash password
def hash_password(password):
    salt = bcrypt.gensalt()
    hashedPassword = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashedPassword

# Function to verify password
def verify_password(storedHash, password):
    return bcrypt.checkpw(password.encode('utf-8'), storedHash)

# Function to generate UUID
def generate_uuid():
    return str(uuid.uuid4())

#Function to format the date
def get_current_date():
    return datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S')

# ~~~~~~~~~~~~~~~~~~~~~~ Account Management ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

@frontend_bp.route("/dashboard")
def dashboard():
    if 'user_id' not in session:
        #return render_template('login.html')
        return jsonify({'error': 'User does not exist within the session'})
    
    user_id = session['user_id']
    #return render_template('dashboard.html', user_id=user_id)
    return jsonify({user_id: 'User ID that is associated with a session'})


@frontend_bp.route("/schedule", methods=['PUT'])
def schedule():
    if request.method == "PUT":
        try:
            response = table.scan(
                FilterExpression=And(Attr('group').eq('admin'), Attr('user_id').is_in(session))
            )
        except ClientError as e:
            return jsonify({'error': 'You are not an admin'}), 403
        try:
            maintenance = schedule_table.scan(
                FilterExpression=Attr('maintenance_scheduled').eq('false')
            )
        except ClientError as e:
            return jsonify({'error': 'BE GONE'}), 403
        try:
            component_id = schedule_table.scan(
                FilterExpression=Attr('component_id').eq('1')
            )
        except ClientError as e:
            return jsonify({'error': 'ID not found'}), 404

        if 'Items' in component_id and len(component_id['Items']) > 0 and 'Items' in maintenance and len(maintenance['Items']) > 0:
            try:
                if 'Items' in component_id and len(component_id['Items']) > 0:
                    component_id = component_id['Items'][0]['component_id']
                else:
                    return jsonify({'error': 'Component ID not found'}), 404

                # Check if item exists before inserting (in case you're replacing it)
                existing_item = schedule_table.get_item(
                    Key={'component_id': str(component_id), 'last_repair_date': '01/01/2001'}
                )
                if 'Item' not in existing_item:
                    return jsonify({'error': 'Item not found in table'}), 404

                # Perform put_item (replaces the existing item with new values)
                maintenance = schedule_table.put_item(
                    Item={
                        'component_id': str(component_id),
                        'train_id': '1',
                        'expected_repair_duf': '03/25/2099',
                        'last_repair_date': '01/01/2001',
                        'maintenance_scheduled': 'false',
                        'manually_overriden': 'true',
                        'mean_duf': 3,
                        'standard_deviation_duf': 12
                    }
                )
                print("Table updated successfully!")
                return jsonify({'message': 'Put item successful'}), 200
            except ClientError as e:
                return jsonify({'error': 'Error putting item in table'}), 500
    else:
        print("table wasn't changed in the database!")

    #return render_template('schedule.html')
    return jsonify({'Status': 'Success', 'Code': '200 OK'}), 200

#Route for logging in a user
@frontend_bp.route("/login", methods=["POST"])
def login():
    #Retrieving data from front end
    email = request.json.get('email')
    password = request.json.get('password')
    print(f"Email: {email}, Password: {password}")
    
    # return jsonify({'email': email, 'password': password}), 200

    if not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400
    
    #Querying DynamoDB for the user
    try:
        response = table.scan(
            FilterExpression=Attr('acc-info.email').eq(email)
        )
        
        if 'Items' not in response or len(response['Items']) == 0:
            return jsonify({'error': 'Invalid credentials'}), 400
        
        userItem = response['Items'][0]
        accInfo = userItem['acc-info']
        storedHashEncoded = accInfo['password']

        #Decoding the base64-encoded hash to get original byte format
        storedHash = base64.b64decode(storedHashEncoded)

        #Verifying the password through hash comparison
        if not verify_password(storedHash, password):
            return jsonify({'error': 'Invalid credentials'}), 400
        
        #Store user info in session
        session['user_id'] = userItem['uuid']

        #return render_template('dashboard.html')
        return jsonify({'Status': 'Success', 'Code': '200 OK'}), 200
    except ClientError as e:
        return jsonify({'error': 'Error verifying user'}), 500

#Route for creating a new user
@frontend_bp.route("/signup", methods=["POST"])
def signup():
    #Retrieving data from front end
    email = request.json.get('email')
    password = request.json.get('password')
    print(f"Email: {email}, Password: {password}")
    
    # return jsonify({'email': email, 'password': password}), 200

    if not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400
    
    #Checking if email already exists
    try:
        response = table.scan(
            FilterExpression=Attr('acc-info.email').eq(email)
        )

        if 'Items' in response and len(response['Items']) > 0:
            return jsonify({'error': 'Email already exists'}), 400
    except ClientError as e:
        return jsonify({'error': 'Error checking email existence'}), 500
    
    #Hasing the password
    hashedPassword = hash_password(password)

    #Encoding the hash to store in Dynamo as a string
    hashedPasswordEncoded = base64.b64encode(hashedPassword).decode('utf-8')

    #Create user object
    userId = generate_uuid()
    userItem = {
        'uuid': userId,
        'group': 'user',
        'acc-info': {
                'email': email,
                'password': hashedPasswordEncoded,
                'date-created': get_current_date()
        }
    }

    #Insert into DynamoDB
    try:
        table.put_item(Item=userItem)
        print(userItem)
        #return  render_template('login.html')
        return jsonify({'Status': 'Success', 'Code': '200 OK'}), 200
    except ClientError as e:
        frontend_bp.logger.error(f"DynamoDB Error: {e}")
        return jsonify({'error': 'Error creating user'}), 500

#Rout for logging out
@frontend_bp.route("/logout")
def logout():
    session.clear()
    #return render_template('login.html')
    return jsonify({'Status': 'Success', 'Code': '200 OK'}), 200

# ~~~~~~~~~~~~~~~~~~~~~~ API STUFF ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

@frontend_bp.route("/schedule", methods=["GET"])
def get_schedule():
    try:
        getSchedule = schedule_table.scan()
    except ClientError as e:
        return jsonify({'Status': 'Failure', 'Code': '500 Internal Server Error', 'Message': 'Cannot retrieve data from the database.'}), 500
    
    return jsonify(getSchedule)

@frontend_bp.route("/dashboard-info", methods=["GET"])
def get_train_info():
    try:
        getTrainInformation = cc_trains.scan()
    except ClientError as e:
        return jsonify({'Status': 'Failure', 'Code': '500 Internal Server Error', 'Message': 'Cannot retrieve data from the database.'}), 500
    
    return jsonify(getTrainInformation)
