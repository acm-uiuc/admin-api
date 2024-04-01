from __future__ import print_function
from auth_utils import AuthPolicy
import json

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
    policy.allowAllMethods() # For now just let anyone in lol

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