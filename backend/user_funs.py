import json, boto3
from decimal import Decimal

dynamodb = boto3.resource('dynamodb', region_name = 'us-east-1')
table = dynamodb.Table('infra-admin-api')

def create_user(netid, roleStr, permStr):
    netid = netid.strip()

    roles = roleStr.split(",")
    roles = [x.strip() for x in roles]

    perms = permStr.split(",")
    perms = [x.strip() for x in perms]

    user = {
        "netid": netid,
        "roles": roles,
        "permissions": perms
    }

    user_json = json.loads(json.dumps(user, indent=4))

    response = table.put_item(
               Item={
                  "netid": netid,
                  "value": user_json
         }
            )

def get_user(netid):
    response = table.get_item(Key={"netid": netid})
    return response.get("Item", "Does Not Exist")

def delete_user(netid):
    response = table.delete_item(Key={"netid": netid})

def update_user(netid, newRoles, newPerms):
    if (get_user(netid) == "Does Not Exist"):
        return "User does not exist"
    
    nRoles = newRoles.split(",")
    nRoles = [x.strip() for x in nRoles]
    nRoles = get_user(netid).get("value").get("roles") + nRoles

    nPerms = newPerms.split(",")
    nPerms = [x.strip() for x in nPerms]
    nPerms = get_user(netid).get("value").get("permissions") + nPerms

    user = {
        "netid": netid,
        "roles": nRoles,
        "permissions": nPerms
    }

    user_json = json.loads(json.dumps(user, indent=4))

    response = table.update_item(
        Key={"netid": netid},
        AttributeUpdates={"value":
            {"Value": user_json,
            "Action": "PUT"}
            }
        )
    
    return get_user(netid)

def execute(method: str, path: str, queryParams: dict, context: dict) -> dict:
    try:
        func: function = find_handler[method][path]
        return func(context, queryParams)
    except KeyError as e:
        print(f"ERROR: No handler found for method {method} and path {path}.")
        return notImplemented(context, queryParams)

def healthzHandler(context, queryParams):
    return {
        "statusCode": 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        "body": "UP"
    }
def notImplemented(context, queryParams):
    return {
        "statusCode": 404,
        'headers': {'Access-Control-Allow-Origin': '*'},
        "body": "Method not implemented."
    }
def serverError(message):
    return {
        "statusCode": 500,
        'headers': {'Access-Control-Allow-Origin': '*'},
        "body": f"An error occurred - {message}"
    }
def badRequest(message):
    return {
        "statusCode": 400,
        'headers': {'Access-Control-Allow-Origin': '*'},
        "body": f"Bad request - {message}"
    }

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return json.JSONEncoder.default(self, obj)

def createUserHandler(context, queryParams):    
    try:
        netid = queryParams["netid"]
        roleStr = queryParams["roleStr"]
        permStr = queryParams["permStr"]        
    except:
        return {
            'statusCode': 404,
            'body': "No netid/roles/permissions provided",
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
        }
    try:
        create_user(netid, roleStr, permStr)
        item = get_user(netid)
        return {
            'statusCode': 200, 
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 
            'body': json.dumps(item, cls=DecimalEncoder)
        }
    except Exception as e:
        print(e)
        return {
            'statusCode': 500, 'body': json.dumps({'message': 'Error.'}),                 
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        }

def getUserHandler(context, queryParams):    
    try:
        netid = queryParams["netid"]
    except:
        return {
            'statusCode': 404,
            'body': "No netid provided",
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
        }
    try:
        item = get_user(netid)
        return {
            'statusCode': 200, 
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 
            'body': json.dumps(item, cls=DecimalEncoder)
        }
    except Exception as e:
        print(e)
        return {
            'statusCode': 500, 'body': json.dumps({'message': 'Error.'}),                 
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        }

def deleteUserHandler(context, queryParams):    
    try:
        netid = queryParams["netid"]
    except:
        return {
            'statusCode': 404,
            'body': "No netid provided",
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
        }
    try:
        item = get_user(netid)
        delete_user(netid)
        return {
            'statusCode': 200, 
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 
            'body': json.dumps(item, cls=DecimalEncoder)
        }
    except Exception as e:
        print(e)
        return {
            'statusCode': 500, 'body': json.dumps({'message': 'Error.'}),                 
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        }

def updateUserHandler(context, queryParams):    
    try:
        netid = queryParams["netid"]
        newRoles = queryParams["newRoles"]
        newPerms = queryParams["newPerms"]
    except:
        return {
            'statusCode': 404,
            'body': "No netid/roles/permissions provided",
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
        }
    try:
        update_user(netid, newRoles, newPerms)
        item = get_user(netid)
        return {
            'statusCode': 200, 
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}, 
            'body': json.dumps(item, cls=DecimalEncoder)
        }
    except Exception as e:
        print(e)
        return {
            'statusCode': 500, 'body': json.dumps({'message': 'Error.'}),                 
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        }

find_handler = {
    "GET": {
        "/api/v1/healthz": healthzHandler,
        "/api/v1/get_user": getUserHandler,
    }
    "PUT": {
        "/api/v1/create_user": createUserHandler,
        "/api/v1/update_user": updateUserHandler,
    }
    "DELETE": {
        "/api/v1/delete_user": deleteUserHandler,
    }
}

def lambda_handler(event, context):
    method = event['httpMethod']
    path = event['path']
    queryParams = event["queryStringParameters"]
    if not queryParams:
        queryParams = {}
    print(f"INFO: Processing request: method {method}, path {path}.")
    try:
        return execute(method, path, queryParams, event['requestContext']['authorizer'])
    except KeyError:
        return execute(method, path, queryParams, {})
