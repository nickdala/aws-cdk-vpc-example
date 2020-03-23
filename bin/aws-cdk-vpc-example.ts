#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsCdkVpcExampleStack } from '../lib/aws-cdk-vpc-example-stack';

const app = new cdk.App();
new AwsCdkVpcExampleStack(app, 'AwsCdkVpcExampleStack');
