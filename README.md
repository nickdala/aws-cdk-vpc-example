# AWS Cloud Development Kit (CDK) Example to Deploy EC2 and VPC Resources

This example demonstrates how to use the [AWS CDK](https://aws.amazon.com/cdk) to deploy a VPC with subnets, security groups and EC2 instances.

## Prerequisites

You will need the following prerequisites installed in order to build and deploy the this project.

### Node.js

The AWS CDK uses Node.js (>= 10.3.0).  To install Node.Js, follow the instructions in the [Node.js](https://nodejs.org/en/download/) website.

### Typescript

This project is developed in Typescript. Install Typescript using the following command.

```sh
npm install -g typescript
```

Verify that Typescript was installed correctly.

```sh
tsc --version
```

### AWS CLI

The AWS CLI is a tool to manage your AWS services from a terminal session. Follow the steps to install the AWS CLI [here](https://aws.amazon.com/cli).

### AWS CDK

Install the AWS CDK using the following command.

```sh
npm install -g aws-cdk
```

Verify that the AWS CDK was installed correctly.

```sh
cdk --version
```

## Build

Install npm modules

```sh
npm install
```

Compile typescript to js

```sh
npm run build
```

Deploy this stack to your default AWS account/region

```sh
cdk deploy
```

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## Accompanying blog post

<https://www.nickthecloudguy.com>
