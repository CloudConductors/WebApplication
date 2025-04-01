from flask import Blueprint, jsonify, session
from botocore.exceptions import ClientError
import boto3
from boto3.dynamodb.conditions import Attr, And

from api.aws import table, schedule_table, cc_trains

machine_learning_bp = Blueprint('machine_learning', __name__)

# def gen_schedule():
#     try:
#         response = table.scan(
#             FilterExpression=And(Attr('group').eq('admin'), Attr('user_id').is_in(session))
#         )
#     except ClientError as e:
#         return jsonify({'error': 'You are not an admin'}), 403
#     try:
#         maintenance = schedule_table.scan(
#             FilterExpression=Attr('Maintenance_Scheduled').eq('false')
#         )
#     except ClientError as e:
#         return jsonify({'error': 'BE GONE'}), 403
#     try:
#         Component_Id = schedule_table.scan(
#             FilterExpression=Attr('component_id').eq('1')
#         )
#     except ClientError as e:
#         return jsonify({'error': 'ID not found'}), 404

#     print('Hello from gen sched')

@machine_learning_bp.route("/train-info", methods=["GET"])
def get_trains():
    try:
        response = cc_trains.scan()
    except ClientError as e:
        return jsonify({'Status': 'Failure', 'Code': '500 Internal Server Error', 'Message': 'Cannot retrieve data from the database.'}), 500
    
    return jsonify(response)