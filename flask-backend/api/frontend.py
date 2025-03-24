from flask import Blueprint, render_template, jsonify
import os
import boto3
from boto3.dynamodb.conditions import Attr
from botocore.exceptions import ClientError
import json
import bcrypt
import base64
import uuid
from datetime import datetime

frontend = Blueprint('frontend', __name__) #used to setup file to be imported to flask

# ~~~~~~~~~~~~~~~~~~~~~~ Sessions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.secret_key = os.urandom(24)

# ~~~~~~~~~~~~~~~~~~~~~~ DynamoDB Connection ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# Set up DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
table = dynamodb.Table('users')

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

@frontend.route("/schedule")
def schedule():
    return  render_template('schedule.html')

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
        return  render_template('login.html')
    except ClientError as e:
        frontend.logger.error(f"DynamoDB Error: {e}")
        return jsonify({'error': 'Error creating user'}), 500

#Rout for logging out
@frontend.route("/logout")
def logout():
    session.clear()
    return render_template('login.html')