from flask import Blueprint, jsonify

machine_learning_bp = Blueprint('machine_learning', __name__)


def gen_schedule():
    try:
        response = table.scan(
            FilterExpression=And(Attr('group').eq('admin'), Attr('user_id').is_in(session))
        )
    except ClientError as e:
        return jsonify({'error': 'You are not an admin'}), 403
    try:
        maintenance = schedule_table.scan(
            FilterExpression=Attr('Maintenance_Scheduled').eq('false')
        )
    except ClientError as e:
        return jsonify({'error': 'BE GONE'}), 403
    try:
        Component_Id = schedule_table.scan(
            FilterExpression=Attr('component_id').eq('1')
        )
    except ClientError as e:
        return jsonify({'error': 'ID not found'}), 404

    print('Hello from gen sched')

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

def anomally_prediction():
    return jsonify({'Message': 'This is a placeholder'})