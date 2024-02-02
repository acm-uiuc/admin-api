#!/bin/bash
sam build --template-file cloudformation/lambda.yml
sam deploy --no-confirm-changeset --no-fail-on-empty-changeset --parameter-overrides ParameterKey=UseCustomDomainName,ParameterValue=false ParameterKey=Env,ParameterValue=dev
