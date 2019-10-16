#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { CdkStorageExampleStack } from '../lib/cdk-storage-example-stack';

const app = new cdk.App();
new CdkStorageExampleStack(app, 'CdkStorageExampleStack');
