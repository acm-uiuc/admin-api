import json
import boto3

dynamodb = boto3.resource('dynamodb', region_name = 'us-east-1')
table = dynamodb.Table('infra-admin-api')

def delete_user(netid):
    response = table.delete_item(Key={"netid": netid})
