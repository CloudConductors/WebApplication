from flask import Blueprint, jsonify
import boto3
from boto3.dynamodb.conditions import Attr, And
from botocore.exceptions import ClientError
from datetime import datetime
import pickle
from sklearn.ensemble import IsolationForest

machine_learning_bp = Blueprint('machine_learning', __name__)

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
schedule_table = dynamodb.Table('cc-metropt3-schedule')

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

def anomally_prediction(embedded_data):
    #Cleaning data (placeholder for now)
    cleaned_data = embedded_data

    # Load anomally_prediction model from S3
    s3_client = boto3.client('s3')
    cloud_bucket = 'cloud-conductors'
    model_filename = 'anomaly_prediction.pkl'

    s3_client.download_file(cloud_bucket, model_filename, model_filename)

    # Load the model locally
    with open(model_filename, 'rb') as model_file:
        clf = pickle.load(model_file)

    # Run the model
    result = clf.predict(cleaned_data)

    if result == True:
        # Test if schedule exists
        try:
                Component_Id = schedule_table.scan(
                    FilterExpression=Attr('component_id').eq('1')
                )
        except ClientError as e:
            return jsonify({'error': 'ID not found'}), 404

        # Update Schedule
        if 'Items' in Component_Id and len(Component_Id['Items']) > 0:
            try:
                if 'Items' in Component_Id and len(Component_Id['Items']) > 0:
                    Component_Id = Component_Id['Items'][0]['component_id']
                else:
                    return jsonify({'error': 'Component ID not found'}), 404

                # Check if item exists before inserting (in case you're replacing it)
                existing_item = schedule_table.get_item(
                    Key={'component_id': str(Component_Id)}
                )
                if 'Item' not in existing_item:
                    return jsonify({'error': 'Item not found in table'}), 404

                # Grabbing current time for update
                current_time = datetime.now().strftime('%m/%d/%Y')

                # Perform put_item (replaces the existing item with new values)
                maintenance = schedule_table.put_item(
                    Item={
                        'component_id': str(Component_Id),
                        'train_id': '1',
                        'component_failure' : 'true',
                        'Expected_Repair_DUF': str(current_time),
                        'Last_Repair_Date': '01/01/2001',
                        'Maintenance_Scheduled': 'true',
                        'Manually_Overriden': 'true',
                        'Mean_DUF': 3,
                        'Standard_Deviation_DUF': 12,
                        
                    }
                )
                print("Table updated successfully!")
                return jsonify({'message': 'Anomaly detected, schedule updated'}), 200
            except ClientError as e:
                return jsonify({'error': 'Error putting item in table'}), 500
        else:
            print("table wasn't changed in the database!")
    else:
        return jsonify({'message': 'No anomaly detected'})