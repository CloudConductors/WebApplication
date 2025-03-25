from flask import Flask
from flask_cors import CORS
from api import frontend, machine_learning, embedded_system #import files from api folder

app = Flask(__name__,
            template_folder='frontend',
            static_folder='frontend',
            static_url_path='')


CORS(app)

# ~~~~~~~~~~~~~~~~~~~~~~ API STUFF ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#All Files in the api folder are called here
app.register_blueprint(frontend) #This calls the fronend.py
app.register_blueprint(machine_learning, url_prefix="/machine-learning") #This calls the , machine_learning.py and sets its url to /machine_learning
app.register_blueprint(embedded_system) #This calls the embeded_system.py