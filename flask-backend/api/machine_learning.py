from flask import Blueprint, jsonify, session
import boto3
from api.schedule_constuction_model import StatsModel, Component
from boto3.dynamodb.conditions import Attr, And
from botocore.exceptions import ClientError
from api.aws import schedule_table, dynamodb
from flask_apscheduler import APScheduler

machine_learning_bp = Blueprint('machine_learning', __name__)

def gen_schedule():
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    try:
        maintenance = schedule_table.scan(
            FilterExpression=Attr('maintenance_scheduled').eq('false')
        )
    except ClientError as e:
        return jsonify({'error': 'BE GONE'}), 403

    components = maintenance["Items"]
    train_map = get_train_map(components)
    schedule_dict = {}
    for train_id in train_map:
        model_component_input = Component.gen_components(train_map[train_id])
        model = StatsModel(components=model_component_input)
        schedule = model.construct_schedual()
        for comp in schedule:
            update_rep_date(schedule_table, comp.id, train_id, comp.recomended_rep)
            schedule_dict[comp.id] = comp.recomended_rep
    return schedule_dict

def update_rep_date(schedule_table, comp_id, train_id, rep_date):
    schedule_table.update_item(
        Key={'component_id': str(comp_id), 'train_id': str(train_id)},
        UpdateExpression='SET expected_repair_duf = :expected_repair_duf',
        ExpressionAttributeValues={':expected_repair_duf': rep_date},
    )

@machine_learning_bp.route("/train-info", methods=["GET"]) 
def get_train_map(components):
    train_map = {}
    for comp in components:
        id = int(comp["train_id"])
        if id not in train_map:
            train_map[id] = []
        train_map[id].append(comp)
    return train_map
