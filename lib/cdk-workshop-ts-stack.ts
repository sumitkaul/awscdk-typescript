import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { HitCounter } from './hitcounter';
import { TableViewer} from 'cdk-dynamo-table-viewer';

export class CdkWorkshopTsStack extends cdk.Stack {
  // constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const hello = new lambda.Function(this,'HelloHandler', {
        runtime: lambda.Runtime.NODEJS_14_X,         
        code: lambda.Code.fromAsset('lambda'),
        handler: 'hello.handler',
    });
    
    const helloWithCounter = new HitCounter(this, 'HelloHitCounter',{
      downstream: hello
    });

    new apigw.LambdaRestApi(this, 'Endpoint' , {
        handler: hello

    });

    new TableViewer(this, 'ViewHitCounter', {
      title: 'Hello Hits',
      table: helloWithCounter.table
    });

  }
}
