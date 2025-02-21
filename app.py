from flask import Flask, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__,
            template_folder='frontend',
            static_folder='frontend',
            static_url_path='')
CORS(app)

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

#Route for logging in a user, for midterm this will not connect to the database yet
@app.route("/login", methods=["POST"])
def login():
    data = {"message": "This is a login POST request"}
    return jsonify(data)

#Route for creating a new user for midterm this will not connect to the database yet
@app.route("/signup", methods=["POST"])
def signup():
    data = {"message": "This is a signup POST request"}
    return jsonify(data)

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