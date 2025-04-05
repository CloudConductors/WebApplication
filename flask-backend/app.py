from flask import Flask
from flask_cors import CORS
from api.frontend import frontend_bp
from api.machine_learning import machine_learning_bp
from api.embedded_system import embedded_system
from flask_apscheduler import APScheduler

app = Flask(__name__,
            template_folder='frontend',
            static_folder='frontend',
            static_url_path='')
CORS(app)

app.register_blueprint(frontend_bp) #This calls the fronend.py
app.register_blueprint(machine_learning_bp, url_prefix="/machine-learning") #This calls the , machine_learning.py and sets its url to /machine_learning
app.register_blueprint(embedded_system) #This calls the embeded_system.py

scheduler = APScheduler()
scheduler.add_job(func=gen_schedule, trigger='interval', id='job', seconds=60)
scheduler.start()

