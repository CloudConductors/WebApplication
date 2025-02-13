from flask import Flask, render_template


app = Flask(__name__)


# Sample route
@app.route("/") #This is what will be shown in the url. '/' is the landing page
def hello_world(): #This is the function, if you need to pass data or anything to the html page, it will be done here. For the midterm this should just contain the return function.
    return render_template('testing.html') #render_template is used to send html to client. inside should be the name of your file that is located under the template folder
