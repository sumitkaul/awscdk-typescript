#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { WorkshopPipelineStack } from '../lib/pipeline-stack';
// import { CdkWorkshopTsStack } from '../lib/cdk-workshop-ts-stack';

const app = new cdk.App();
new WorkshopPipelineStack(app, 'CdkWorkshopPipelineStack');
// new CdkWorkshopTsStack(app, 'CdkWorkshopTsStack');