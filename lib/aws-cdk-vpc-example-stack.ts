import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

export class AwsCdkVpcExampleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'Demo CDK VPC', {
      // 192.168.0.0/16 CIDR block for our VPC
      cidr: '192.168.0.0/16',

      // For this example, we'll only use 1 availability zone
      maxAzs: 1,
    
      // Set up a Public and a Private subnet in the single availability zone
      subnetConfiguration: [
        {
          name: 'Public Subnet',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24
        },
        {
          name: 'Private Subnet',
          subnetType: ec2.SubnetType.PRIVATE,
          cidrMask: 24
        }
      ]
    });

    // Create a security group for the web server instance that allows incoming connections on
    // port 80 from anywhere
    const webSecurityGroup = new ec2.SecurityGroup(this, "Web Server Instances", {
      vpc: vpc
    });
    webSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'allow web access from the world');
    
    // Launch the web server EC2 instance in the public subnet
    const webServer = new ec2.Instance(this, "Web Server", {
      vpc: vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux(),
      vpcSubnets: {
        subnets: vpc.publicSubnets
      },
      securityGroup: webSecurityGroup
    });

    // Create a security group for the database instance that allows incoming connections on the
    // PostgreSQL port 5432 from the web server security group
    const rdsSecurityGroup = new ec2.SecurityGroup(this, "RDS Instances", {
      vpc: vpc
    });
    rdsSecurityGroup.addIngressRule(webSecurityGroup, ec2.Port.tcp(5432), 'allow postgreSQL access from the web server security group');

    // Launch the database server EC2 instance in the private subnet
    const databaseServer = new ec2.Instance(this, "Database Server", {
      vpc: vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux(),
      vpcSubnets: {
        subnets: vpc.privateSubnets
      },
      securityGroup: rdsSecurityGroup
    });
  }
}
