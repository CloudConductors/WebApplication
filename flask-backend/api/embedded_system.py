from flask import Blueprint

embedded_system = Blueprint('embedded_system', __name__) #used to setup file to be imported to flask

#use flask as usual below, just use @embedded_system ustead of @app

# Sample route
# @embedded_system.route("/") 
# def index():
#     return 