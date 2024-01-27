import json
import boto3

dynamodb = boto3.resource('dynamodb', region_name = 'us-east-1')
table = dynamodb.Table('infra-admin-api')

def get_user(netid):
    response = table.get_item(Key={"netid": netid})
    return response.get("Item", "Does Not Exist")
