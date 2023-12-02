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

#def modify_user(netid, newRoles, newPerms):

if __name__ == "__main__":
    netid = input("netid: ")
    roles = input("roles: ")
    perms = input("perms: ")

    create_user(netid, roles, perms)

    print(f"getting user: {get_user(netid)}")

    print("deleting user")

    delete_user(netid)

    print(f"getting user: {get_user(netid)}")
