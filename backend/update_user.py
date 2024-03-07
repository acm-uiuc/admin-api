import json
import boto3

dynamodb = boto3.resource('dynamodb', region_name = 'us-east-1')
table = dynamodb.Table('infra-admin-api')

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
