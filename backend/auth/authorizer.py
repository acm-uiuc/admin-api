from __future__ import print_function
from auth_utils import AuthPolicy
import json
import requests
from jose import jwt

# Constants
CLIENT_ID = '86baa161-ea6e-4c68-a75a-9ff13690f7da'
TENANT_ID = 'c8d9148f-9a59-4db3-827d-42ea0c2b6e2e'
ADMIN_API_USER_GROUP_OBJECT_ID = '05de763f-9468-4f98-944b-21c20aee9818'
CLIENT_SECRET = '' # TODO: use secrets manager

def get_user_object_id(token): 
    # https://github.com/Azure-Samples/ms-identity-python-webapi-azurefunctions/blob/master/Function/secureFlaskApp/__init__.py   
    keys_req = requests.get(f"https://login.microsoftonline.com/{TENANT_ID}/discovery/v2.0/keys")
    keys = keys_req.json()['keys']
    unverified_header = jwt.get_unverified_header(token)
    rsa_key = {}
    for key in keys:
        if key['kid'] == unverified_header['kid']:
            rsa_key = {
                "kty": key["kty"],
                "kid": key["kid"],
                "use": key["use"],
                "n": key["n"],
                "e": key["e"]
            }    
    if not rsa_key:
        raise Exception('No RSA key!')
    payload = jwt.decode(
        token,
        rsa_key,
        algorithms=['RS256'],
        audience=CLIENT_ID,
        issuer=f"https://login.microsoftonline.com/{TENANT_ID}/v2.0",
    )
    return payload['oid']


def get_graph_api_token():
    # Acquiring Graph API token
    graph_token_req = requests.post(
        f'https://login.microsoftonline.com/{TENANT_ID}/oauth2/token',
        data={
            'grant_type': 'client_credentials',
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'scope': 'https://graph.microsoft.com/.default'
        }
    )
    print(json.dumps(graph_token_req.json(), indent=4))
    return graph_token_req.json()['access_token']

def get_group_list(user_object_id, graph_api_token):
    # Currently gives "Invalid audience" error
    member_req = requests.get(
        f"https://graph.microsoft.com/v1.0/users/{user_object_id}/memberOf",
        headers={
            'Authorization': f'Bearer {graph_api_token}',
            'Content-Type': 'application/json'
        })
    return member_req.json()


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

    try:
        user_object_id = get_user_object_id(token)
    except Exception:
        raise Exception('Unauthorized')

    print(f'User object id: {user_object_id}')

    # try:
    #     graph_api_token = get_graph_api_token()
    #     group_list = get_group_list(user_object_id, graph_api_token)
    # except Exception:
    #     raise Exception('Graph API error')
    
    # print(f'Group object list: {group_list}')
    # if ADMIN_API_USER_GROUP_OBJECT_ID not in group_list:
    #     raise Exception('Unauthorized')
    
    policy.allowAllMethods()

    # Finally, build the policy
    authResponse = policy.build()
    print("Auth response: " + json.dumps(authResponse, indent=4))
    
    return authResponse

if __name__ == '__main__':
    # the tokens are literally too long for my shell, so i needed to split the Bearer token to input it all for testing
    token = input() + input()
    lambda_handler({
        'authorizationToken': f'Bearer {token}',
        'methodArn': 'arn:aws:execute-api:us-east-1:427040638965:x7aneaby6i/Stage/GET/api/v1/get_user'
    }, None)