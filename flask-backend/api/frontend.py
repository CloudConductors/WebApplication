from flask import Blueprint, render_template, jsonify
import os
import boto3
from boto3.dynamodb.conditions import Attr, And
from botocore.exceptions import ClientError
import json
import bcrypt
import base64
import uuid
from datetime import datetime

frontend = Blueprint('frontend', __name__) #used to setup file to be imported to flask

# ~~~~~~~~~~~~~~~~~~~~~~ Sessions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
frontend.secret_key = os.urandom(24)

# ~~~~~~~~~~~~~~~~~~~~~~ DynamoDB Connection ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# Set up DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
table = dynamodb.Table('users')
schedule_table = dynamodb.Table('cc-metro3-schedule')

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

# Sample route
@frontend.route("/") #This is what will be shown in the url. '/' is the landing page
def index(): #This is the function, if you need to pass data or anything to the html page, it will be done here. For the midterm this should just contain the return function.
    return  render_template('index.html') #render_template is used to send html to client. inside should be the name of your file that is located under the template folder

@frontend.route("/dashboard")
def dashboard():
    if 'user_id' not in session:
        return render_template('login.html')
    
    user_id = session['user_id']
    return  render_template('dashboard.html', user_id=user_id)

# In Progress
# @frontend.route("/analytics")
# def analytics():
#     return  render_template('analytics.html')

<<<<<<< HEAD:app.py
@app.route("/schedule", methods=['PUT'])
=======
@frontend.route("/schedule")
>>>>>>> main:flask-backend/api/frontend.py
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
                FilterExpression=Attr('Maintenance_Scheduled').eq('false')
            )
        except ClientError as e:
            return jsonify({'error': 'BE GONE'}), 403
        try:
            Component_Id = schedule_table.scan(
                FilterExpression=Attr('component_id').eq('1')
            )
        except ClientError as e:
            return jsonify({'error': 'ID not found'}), 404

        if 'Items' in Component_Id and len(Component_Id['Items']) > 0 and 'Items' in maintenance and len(maintenance['Items']) > 0:
            try:
                if 'Items' in Component_Id and len(Component_Id['Items']) > 0:
                    Component_Id = Component_Id['Items'][0]['component_id']
                else:
                    return jsonify({'error': 'Component ID not found'}), 404

                # Check if item exists before inserting (in case you're replacing it)
                existing_item = schedule_table.get_item(
                    Key={'component_id': str(Component_Id), 'Last_Repair_Date': '01/01/2001'}
                )
                if 'Item' not in existing_item:
                    return jsonify({'error': 'Item not found in table'}), 404

                # Perform put_item (replaces the existing item with new values)
                maintenance = schedule_table.put_item(
                    Item={
                        'component_id': str(Component_Id),
                        'Last_Repair_Date': '01/01/2001',
                        'Expected_Repair_DUF': '03/25/2099',
                        'Maintenance_Scheduled': 'true',
                        'Manually_Overriden': 'true',
                        'Mean_DUF': 3,
                        'Standard_Deviation_DUF' : 12
                    }
                )
                print("Table updated successfully!")
                return jsonify({'message': 'Put item successful'}), 200
            except ClientError as e:
                return jsonify({'error': 'Error putting item in table'}), 500
    else:
        print("table wasn't changed in the database!")

    return render_template('schedule.html')

# In Progress
# @frontend.route("/alert")
# def alert():
#     return  render_template('alert.html')

# In Progress
# @frontend.route("/team")
# def team():
#     return  render_template('team.html')

#Route for logging in a user
@frontend.route("/login", methods=["POST"])
def login():
    #Retrieving data from front end
    email = request.form.get('email')
    password = request.form.get('password')

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

        return  render_template('dashboard.html')
    except ClientError as e:
        return jsonify({'error': 'Error verifying user'}), 500

#Route for creating a new user
@frontend.route("/signup", methods=["POST"])
def signup():
    #Retrieving data from front end
    email = request.form.get('email')
    password = request.form.get('password')

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
                'password': hashedPasswordEncoded,
                'email': email,
                'date-created': get_current_date()
        }
    }

    #Insert into DynamoDB
    try:
        table.put_item(Item=userItem)
        print(userItem)
        return  render_template('login.html')
    except ClientError as e:
        frontend.logger.error(f"DynamoDB Error: {e}")
        return jsonify({'error': 'Error creating user'}), 500

#Rout for logging out
@frontend.route("/logout")
def logout():
    session.clear()
<<<<<<< HEAD:app.py
    return render_template('login.html')


# ~~~~~~~~~~~~~~~~~~~~~~ API STUFF ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

@app.route("/train-info", methods=["GET"]) 
def get_train_info(): #Changed from hello_world() --> get_train_info()
    trains = {
        0: {
                "name": "train0",
                "components": {
                    "brakes": {
                        "last-replaced": 180,
                        "expected-failure": 121,
                        "std-dev": 5,
                        "recomended-maintenance": 110,
                    },
                    "engine": {
                        "last-replaced": 80,
                        "expected-failure": 221,
                        "std-dev": 5,
                        "recomended-maintenance": 210,
                    },
                    "lights": {
                        "last-replaced": 280,
                        "expected-failure": 11,
                        "std-dev": 5,
                        "recomended-maintenance": 0,
                    },
                    "electronics": {
                        "last-replaced": 10,
                        "expected-failure": 321,
                        "std-dev": 5,
                        "recomended-maintenance": 310,
                    },
                },
        },
        1: {
                "name": "train1",
                "components": {
                    "brakes": {
                        "last-replaced": 10,
                        "expected-failure": 1,
                        "std-dev": 5,
                        "recomended-maintenance": 0,
                    },
                    "engine": {
                        "last-replaced": 330,
                        "expected-failure": 221,
                        "std-dev": 5,
                        "recomended-maintenance": 350,
                    },
                    "lights": {
                        "last-replaced": 50,
                        "expected-failure": 1,
                        "std-dev": 69,
                        "recomended-maintenance": 0,
                    },
                    "electronics": {
                        "last-replaced": 130,
                        "expected-failure": 51,
                        "std-dev": 12,
                        "recomended-maintenance": 110,
                    },
                },
        },
        2: {
                "name": "train2",
                "components": {
                    "brakes": {
                        "last-replaced": 431,
                        "expected-failure": 231,
                        "std-dev": 40,
                        "recomended-maintenance": 200,
                    },
                    "engine": {
                        "last-replaced": 34,
                        "expected-failure": 321,
                        "std-dev": 5,
                        "recomended-maintenance": 410,
                    },
                    "lights": {
                        "last-replaced": 342,
                        "expected-failure": 32,
                        "std-dev": 61,
                        "recomended-maintenance": 523,
                    },
                    "electronics": {
                        "last-replaced": 2134,
                        "expected-failure": 23,
                        "std-dev": 34,
                        "recomended-maintenance": 2134,
                    },
                },
        },
    }
    return jsonify(trains)
=======
    return render_template('login.html')
>>>>>>> main:flask-backend/api/frontend.py
