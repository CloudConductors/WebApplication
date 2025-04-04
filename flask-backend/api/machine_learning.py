from flask import Blueprint, jsonify
import boto3
from schedule_constuction_model import StatsModel, Component
from boto3.dynamodb.conditions import Attr, And
from botocore.exceptions import ClientError

machine_learning_bp = Blueprint('machine_learning', __name__)


def gen_schedule():
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    schedule_table = dynamodb.Table('cc-metropt3-schedule')
    try:
        maintenance = schedule_table.scan(
            FilterExpression=Attr('maintenance_scheduled').eq('false')
        )
    except ClientError as e:
        return jsonify({'error': 'BE GONE'}), 403

    components = maintenance["Items"]
    train_map = get_train_map(components)
    schedule_dict = {}
    for i in train_map:
        model_component_input = Component.gen_components(train_map[i])
        model = StatsModel(components=model_component_input)
        schedule = model.construct_schedual()
        for comp in schedule:
            schedule_dict[comp.id] = comp.recomended_rep
    print(schedule_dict)
    return schedule_dict




def get_train_map(components):
    print("Entered Get Train Map")
    print("Comps: ")
    print(components)
    train_map = {}
    for comp in components:
        print("train_id: " , comp["train_id"])
        id = int(comp["train_id"])
        if id not in train_map:
            print("hit")
            train_map[id] = []
        train_map[id].append(comp)
        print(train_map[id])
    print(train_map)
    return train_map



@machine_learning_bp.route("/train-info", methods=["GET"]) 
def get_train_info():
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
