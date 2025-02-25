from flask import Blueprint, render_template, jsonify

frontend = Blueprint('frontend', __name__) #used to setup file to be imported to flask

# ~~~~~~~~~~~~~~~~~~~~~~ HTML ROUTES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# Sample route
@frontend.route("/") #This is what will be shown in the url. '/' is the landing page
def index(): #This is the function, if you need to pass data or anything to the html page, it will be done here. For the midterm this should just contain the return function.
    return  render_template('index.html') #render_template is used to send html to client. inside should be the name of your file that is located under the template folder

@frontend.route("/dashboard")
def dashboard():
    return  render_template('dashboard.html')

# In Progress
# @app.route("/analytics")
# def analytics():
#     return  render_template('analytics.html')

@frontend.route("/schedule")
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
@frontend.route("/login", methods=["POST"])
def login():
    data = {"message": "This is a login POST request"}
    return jsonify(data)

#Route for creating a new user for midterm this will not connect to the database yet
@frontend.route("/signup", methods=["POST"])
def signup():
    data = {"message": "This is a signup POST request"}
    return jsonify(data)