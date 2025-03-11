from flask import Blueprint #Blueprint is used to import differnt files to flask AKA orginization

#Import files in api folder
from .frontend import frontend
from .machine_learning import machine_learning
from .embedded_system import embedded_system