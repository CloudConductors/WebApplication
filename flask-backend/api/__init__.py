from flask import send_from_directory, Flask, Blueprint #Blueprint is used to import different files to flask (i.e its for orginization of our app
from flask_cors import CORS
import os

#Import files in the api folder
from .embedded_system import embedded_system
from .frontend import frontend
from .machine_learning import machine_learning

def create_app():
    app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
    CORS(app) 

    app.register_blueprint(embedded_system, url_prefix='/api/embedded_system')
    app.register_blueprint(frontend, url_prefix='/api/frontend')
    app.register_blueprint(machine_learning, url_prefix='/api/machine_learning')

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_react(path):
        """Serve the React build files"""
        if path != "" and os.path.exists(app.static_folder + '/' + path):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')

    return app