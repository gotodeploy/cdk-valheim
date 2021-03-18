import * as apigw from '@aws-cdk/aws-apigateway';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdaPython from '@aws-cdk/aws-lambda-python';
import * as cdk from '@aws-cdk/core';

export interface HammerProps {
  readonly applicationPublicKey: string;
  readonly ecsServiceName: string;
  readonly ecsClusterArn: string;
}

export class Hammer extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: HammerProps) {
    super(scope, id);
    const commandHandler = new lambdaPython.PythonFunction(
      this,
      'FlaskAppLambda',
      {
        entry: './assets/functions/discord/',
        runtime: lambda.Runtime.PYTHON_3_8,
        environment: {
          APPLICATION_PUBLIC_KEY: props.applicationPublicKey,
          ECS_SERVICE_NAME: props.ecsServiceName,
          ECS_CLUSTER_ARN: props.ecsClusterArn,
        },
      },
    );

    commandHandler.role?.addManagedPolicy(
      iam.ManagedPolicy.fromManagedPolicyArn(
        this,
        'ECS_FullAccessPolicy',
        'arn:aws:iam::aws:policy/AmazonECS_FullAccess',
      ),
    );

    // https://slmkitani.medium.com/passing-custom-headers-through-amazon-api-gateway-to-an-aws-lambda-function-f3a1cfdc0e29
    const requestTemplates = {
      'application/json': `{
          "method": "$context.httpMethod", 
          "body" : $input.json("$"), 
          "headers": { 
              #foreach($param in $input.params().header.keySet())        
              "$param": "$util.escapeJavaScript($input.params().header.get($param))"
              #if($foreach.hasNext),#end
              #end
          }
      }
      `,
    };

    const apiEndpoint = new apigw.RestApi(this, 'FlaskAppEndpoint');
    apiEndpoint.root.addMethod('ANY');
    const webhook = apiEndpoint.root.addResource('discord');
    const webhookIntegration = new apigw.LambdaIntegration(commandHandler, { requestTemplates });
    webhook.addMethod('POST', webhookIntegration);
  }
}
