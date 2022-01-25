import * as cdk from 'aws-cdk-lib';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import { CodePipeline } from 'aws-cdk-lib/aws-events-targets';
import { Code } from 'aws-cdk-lib/aws-lambda';
import { CodeBuildStep, CodePipelineSource } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';

export class WorkshopPipelineStack extends cdk.Stack{
    constructor(scope: Construct, id: string , props?: cdk.StackProps ){
        super(scope, id, props);

    new codecommit.Repository(this, 'WorkshopRepo', {
        repositoryName: 'WorkshopRepo'
    });

    // const pipeline = new CodePipeline( this, 'Pipeline', {
    //     pipelineName: 'WorkshopPipeline',
    //     synth: new CodeBuildStep('SynthStep' , { 
    //             input: CodePipelineSource.codeCommit( repo , 'master'),
    //             installCommands:[
    //                 'npm install -g aws-cdk'
    //             ],
    //             commands:[
    //                 'npm ci',
    //                 'npm run build', 
    //                 'npm cdk synth'
    //             ]
    //         }
    //     )
    // });

    const pipeline = new CodePipeline(this, 'Pipeline', {
        pipelineName: 'WorkshopPipeline',
        synth: new CodeBuildStep('SynthStep', {
                input: CodePipelineSource.codeCommit(repo, 'master'),
                installCommands: [
                    'npm install -g aws-cdk'
                ],
                commands: [
                    'npm ci',
                    'npm run build',
                    'npx cdk synth'
                ]
            }
        )
    });

    }
}