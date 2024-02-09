import json
import boto3

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

def userManagementHandler(context, queryParams):
    #todo

find_handler = {
    "GET": {
        "/api/v1/healthz": healthzHandler,
        "/api/v1/create_user": userManagementHandler,
    }
}

if __name__ == "__main__":
    netid = input("netid: ")
    roles = input("roles: ")
    perms = input("perms: ")

    create_user(netid, roles, perms)

    print(f"getting user: {get_user(netid)}")

    print(f"updating user: {update_user(netid, '11, 22', '  22  , 11 ')}")

    print("deleting user")

    delete_user(netid)

    print(f"getting user: {get_user(netid)}")

    print(f"updating user: {update_user(netid, '11, 22', '  22  , 11 ')}")
