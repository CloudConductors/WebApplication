from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import boto3
from boto3.dynamodb.conditions import Attr
from botocore.exceptions import ClientError
import json
import bcrypt
import base64
import uuid
from datetime import datetime

app = Flask(__name__,
            template_folder='frontend',
            static_folder='frontend',
            static_url_path='')
CORS(app)

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

# ~~~~~~~~~~~~~~~~~~~~~~ HTML ROUTES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# Sample route
@app.route("/") #This is what will be shown in the url. '/' is the landing page
def index(): #This is the function, if you need to pass data or anything to the html page, it will be done here. For the midterm this should just contain the return function.
    return  render_template('index.html') #render_template is used to send html to client. inside should be the name of your file that is located under the template folder

@app.route("/dashboard")
def dashboard():
    return  render_template('dashboard.html')

# In Progress
# @app.route("/analytics")
# def analytics():
#     return  render_template('analytics.html')

@app.route("/schedule")
def schedule():
    return  render_template('schedule.html')

# In Progress
# @app.route("/alert")
# def alert():
#     return  render_template('alert.html')

# In Progress
# @app.route("/team")
# def team():
#     return  render_template('team.html')

#Route for logging in a user
@app.route("/login", methods=["POST"])
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
        
        return  render_template('dashboard.html')
    except ClientError as e:
        return jsonify({'error': 'Error verifying user'}), 500

#Route for creating a new user for midterm this will not connect to the database yet
@app.route("/signup", methods=["POST"])
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
        app.logger.error(f"DynamoDB Error: {e}")
        return jsonify({'error': 'Error creating user'}), 500


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