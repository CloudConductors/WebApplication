import boto3

# ~~~~~~~~~~~~~~~~~~~~~~ DynamoDB Connection ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# Initialize a DynamoDB resource
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

# Define your tables
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
table = dynamodb.Table('users')
schedule_table = dynamodb.Table('cc-metropt3-schedule')
