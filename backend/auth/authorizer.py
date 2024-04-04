from __future__ import print_function
from auth_utils import AuthPolicy
import json
import requests
from msal import ConfidentialClientApplication

def lambda_handler(event, context):
    """Do not print the auth token unless absolutely necessary """
    method, token = event['authorizationToken'].split(' ')
    print("Client token: " + event['authorizationToken'])
    print("Method ARN: " + event['methodArn'])
    
    principalId = token

    tmp = event['methodArn'].split(':')
    apiGatewayArnTmp = tmp[5].split('/')
    awsAccountId = tmp[4]

    policy = AuthPolicy(principalId, awsAccountId)
    policy.restApiId = apiGatewayArnTmp[0]
    policy.region = tmp[3]
    policy.stage = apiGatewayArnTmp[1]

    # TODO: call Azure to determine if user is allowed to use API
    # if valid user, then allowAllMethods
    #tenant_id??

    # Define the user's object ID and the group's object ID
    user_object_id = '8412d538-534d-45f0-9a69-6b52eaf39560'
    group_object_id = 'GROUP_OBJECT_ID'

    # Create a Confidential Client Application instance

    # Check if the user is a member of the group
    url = f"https://graph.microsoft.com/v1.0/groups/{group_object_id}/members/{user_object_id}/$ref"
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    response = requests.get(url, headers=headers)

    if response.status_code == 204:
        print("User is a member of the group.")
        policy.allowAllMethods()
    elif response.status_code == 404:
        print("User is not a member of the group.")
    else:
        print("Error occurred while checking group membership.")
    #policy.allowAllMethods() # For now just let anyone in lol

    # Finally, build the policy
    authResponse = policy.build()
    print("Auth response: " + json.dumps(authResponse, indent=4))
 
    # context = {
    #     'key': 'value', # $context.authorizer.key -> value
    #     'number' : 1,
    #     'bool' : True
    # }
    # authResponse['context'] = context
    
    return authResponse