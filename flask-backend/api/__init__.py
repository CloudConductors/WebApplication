from flask import Blueprint #Blueprint is used to import different files to flask (i.e its for orginization of our app

#Import files in the api folder
from .embedded_system import embedded_system
from .frontend import frontend
from .machine_learning import machine_learning