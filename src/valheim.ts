import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as efs from '@aws-cdk/aws-efs';
import * as logs from '@aws-cdk/aws-logs';
import { CfnOutput, Construct } from '@aws-cdk/core';

export interface ValheimWorldProps {
  readonly vpc?: ec2.IVpc;
  readonly fileSystem?: efs.FileSystem;
  readonly image?: ecs.ContainerImage;
  /**
   * The number of cpu units used by the task. For tasks using the Fargate launch type,
   * this field is required and you must use one of the following values,
   * which determines your range of valid values for the memory parameter:
   *
   * 256 (.25 vCPU) - Available memory values: 512 (0.5 GB), 1024 (1 GB), 2048 (2 GB)
   *
   * 512 (.5 vCPU) - Available memory values: 1024 (1 GB), 2048 (2 GB), 3072 (3 GB), 4096 (4 GB)
   *
   * 1024 (1 vCPU) - Available memory values: 2048 (2 GB), 3072 (3 GB), 4096 (4 GB), 5120 (5 GB), 6144 (6 GB), 7168 (7 GB), 8192 (8 GB)
   *
   * 2048 (2 vCPU) - Available memory values: Between 4096 (4 GB) and 16384 (16 GB) in increments of 1024 (1 GB)
   *
   * 4096 (4 vCPU) - Available memory values: Between 8192 (8 GB) and 30720 (30 GB) in increments of 1024 (1 GB)
   *
   * @default 1024
   */
  readonly cpu?: number;
  /**
   * The amount (in MiB) of memory used by the task. For tasks using the Fargate launch type,
   * this field is required and you must use one of the following values, which determines your range of valid values for the cpu parameter:
   *
   * 512 (0.5 GB), 1024 (1 GB), 2048 (2 GB) - Available cpu values: 256 (.25 vCPU)
   *
   * 1024 (1 GB), 2048 (2 GB), 3072 (3 GB), 4096 (4 GB) - Available cpu values: 512 (.5 vCPU)
   *
   * 2048 (2 GB), 3072 (3 GB), 4096 (4 GB), 5120 (5 GB), 6144 (6 GB), 7168 (7 GB), 8192 (8 GB) - Available cpu values: 1024 (1 vCPU)
   *
   * Between 4096 (4 GB) and 16384 (16 GB) in increments of 1024 (1 GB) - Available cpu values: 2048 (2 vCPU)
   *
   * Between 8192 (8 GB) and 30720 (30 GB) in increments of 1024 (1 GB) - Available cpu values: 4096 (4 vCPU)
   *
   * @default 2048
   */
  readonly memoryLimitMiB?: number;
  readonly desiredCount?: number;

  /**
   * https://github.com/lloesche/valheim-server-docker#environment-variables
   */
  readonly environment?: {
    [key: string]: string;
  };
  /**
   * Valheim Server log Group.
   *
   * @default - Create the new AWS Cloudwatch Log Group for Valheim Server.
   */
  readonly logGroup?: ecs.AwsLogDriver;
}


export class ValheimWorld extends Construct {
  public service: ecs.FargateService;

  constructor(scope: Construct, id: string, props?: ValheimWorldProps) {
    super(scope, id);

    const vpc = props?.vpc ?? ec2.Vpc.fromLookup(this, 'DefaultVpc', {
      isDefault: true,
    });

    const cluster = new ecs.Cluster(this, 'ValheimCluster', { vpc });

    // Create the file system
    const fileSystem = props?.fileSystem ?? new efs.FileSystem(this, 'ValheimSaveDataEFS', {
      vpc,
      lifecyclePolicy: efs.LifecyclePolicy.AFTER_14_DAYS,
    });

    const volumeConfig = {
      name: 'valheim-save-data',
      efsVolumeConfiguration: {
        fileSystemId: fileSystem.fileSystemId,
      },
    };

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'ValheimTaskDefinition', {
      family: 'valheim-world',
      volumes: [volumeConfig],
      cpu: props?.cpu ?? 1024,
      memoryLimitMiB: props?.memoryLimitMiB ?? 2048,
    });

    const containerDefinition = taskDefinition.addContainer('ValheimContainer', {
      image: props?.image ?? ecs.ContainerImage.fromRegistry('lloesche/valheim-server'),
      logging: props?.logGroup ?? new ecs.AwsLogDriver({
        streamPrefix: 'valheim',
        logRetention: logs.RetentionDays.ONE_DAY,
      }),
      environment: props?.environment,
    });
    containerDefinition.addMountPoints(
      {
        containerPath: '/config/',
        sourceVolume: volumeConfig.name,
        readOnly: false,
      },
    );

    this.service = new ecs.FargateService(this, 'ValheimService', {
      cluster,
      platformVersion: ecs.FargatePlatformVersion.VERSION1_4,
      assignPublicIp: true,
      taskDefinition,
      desiredCount: props?.desiredCount ?? 1,
    });

    // Allow TCP 2049 for EFS
    this.service.connections.allowFrom(fileSystem, ec2.Port.tcp(2049));
    this.service.connections.allowTo(fileSystem, ec2.Port.tcp(2049));

    // Allow UDP 2456-2458 for Valheim
    this.service.connections.allowFrom(ec2.Peer.anyIpv4(), ec2.Port.udpRange(2456, 2458));

    new CfnOutput(this, 'ValheimServiceArn', {
      value: this.service.serviceArn,
    });
  }
}
