import * as appscaling from '@aws-cdk/aws-applicationautoscaling';
import * as backup from '@aws-cdk/aws-backup';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as efs from '@aws-cdk/aws-efs';
import * as events from '@aws-cdk/aws-events';
import * as logs from '@aws-cdk/aws-logs';
import * as cdk from '@aws-cdk/core';

/**
 * Options for ValheimWorldScalingSchedule.
 */
export interface ValheimWorldScalingScheduleProps {
  /**
   * Options to configure a cron expression for server for server launching schedule.
   *
   * All fields are strings so you can use complex expressions. Absence of
   * a field implies '*' or '?', whichever one is appropriate. Only comma
   * separated numbers and hypens are allowed.
   */
  readonly startAt: appscaling.CronOptions;

  /**
   * Options to configure a cron expression for server zero-scale schedule.
   *
   * All fields are strings so you can use complex expressions. Absence of
   * a field implies '*' or '?', whichever one is appropriate. Only comma
   * separated numbers and hypens are allowed.
   */
  readonly stopAt: appscaling.CronOptions;
}

export interface ValheimWorldProps {
  /**
   * The VPC where your ECS instances will be running or your ENIs will be deployed.
   *
   * @default - creates a new VPC with two AZs
   */
  readonly vpc?: ec2.IVpc;

  /**
   * Persistent storage for save data.
   *
   * @default - Amazon EFS for default persistent storage.
   */
  readonly fileSystem?: efs.FileSystem;

  /**
   * AWS Backup plan for EFS.
   *
   * @default - Hourly backup with 3 days retension.
   */
  readonly backupPlan?: backup.BackupPlan;

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

  /**
   * Desired count of Fargate container. Set 0 for maintenance.
   *
   * @default - 1
   */
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
  readonly logGroup?: ecs.LogDriver;

  /**
   * Running schedules.
   *
   * @default - Always running.
   */
  readonly schedules?: ValheimWorldScalingScheduleProps[];
}

/**
 * Represents the schedule to determine when the server starts or terminates.
 */
export class ValheimWorldScalingSchedule {
  private static range(start: number, stop: number) {
    return Array.from(
      { length: (stop - start) + 1 }, (_, i) => start + i);
  }

  private static toIntArraySorted(expression: string, allowedRange: number[]): Uint8Array {
    const flat = (nested: any[]) => [].concat(...nested);

    return Uint8Array.from(
      flat(
        expression
          .split(',')
          .map(chunk => {
            const rangeChunk = chunk.split('-');
            if (rangeChunk.length == 2) {
              return allowedRange.slice(
                parseInt(rangeChunk[0], 10),
                parseInt(rangeChunk[1], 10) + 1,
              );
            }
            return parseInt(chunk, 10);
          }),
      ),
    ).sort();
  }

  /**
   * Options to configure a cron expression for server for server launching schedule.
   *
   * All fields are strings so you can use complex expressions. Absence of
   * a field implies '*' or '?', whichever one is appropriate. Only comma
   * separated numbers and hypens are allowed.
   */
  public readonly startAt: appscaling.CronOptions;

  /**
   * Options to configure a cron expression for server zero-scale schedule.
   *
   * All fields are strings so you can use complex expressions. Absence of
   * a field implies '*' or '?', whichever one is appropriate. Only comma
   * separated numbers and hypens are allowed.
   */
  public readonly stopAt: appscaling.CronOptions;

  constructor(schedule: ValheimWorldScalingScheduleProps) {
    this.startAt = schedule.startAt;
    this.stopAt = schedule.stopAt;
  }

  private toCron(propertyName: string, maxRange: number, start?: string, stop?: string): string | undefined {
    if (typeof start === 'undefined' && typeof stop === 'undefined') {
      return undefined;
    }

    if (typeof start === 'undefined' || typeof stop === 'undefined') {
      throw new Error(`The property "${propertyName}" must be set for both startAt and endAt.`);
    }

    const regex = new RegExp(/^$|[^\d\-,]+/);
    if (regex.test(start) || regex.test(stop)) {
      throw new Error(`The property "${propertyName}" is only allowed to use numbers, hypens and commas.`);
    }

    const allowedRange = ValheimWorldScalingSchedule.range(0, maxRange);
    let from = ValheimWorldScalingSchedule.toIntArraySorted(start, allowedRange);
    let to = ValheimWorldScalingSchedule.toIntArraySorted(stop, allowedRange);

    if (from.length != to.length) {
      throw new Error('The lengths of both startAt and endAt properties must be exactly the same.');
    }

    if (from[0] > to[0]) {
      return `${from[0]}-${maxRange},0-${to[0]}`;
    }

    let cronExpression: string[] = [];
    from.forEach((n, i) => {
      if (n == to[i]) {
        cronExpression.push(n.toString());
      } else {
        cronExpression.push(`${n}-${to[i]}`);
      }
    });

    return [...new Set([...cronExpression])].join(',');
  }

  private toCronHour(): string | undefined {
    return this.toCron('hour', 23, this.startAt.hour, this.stopAt.hour);
  }

  private toCronWeekDay(): string | undefined {
    return this.toCron('weekDay', 6, this.startAt.weekDay, this.stopAt.weekDay);
  }

  /**
   * Returns the cron option merged both startAt and endAt.
   */
  public toCronOptions(): appscaling.CronOptions {
    return {
      hour: this.toCronHour(),
      weekDay: this.toCronWeekDay(),
    };
  }
}

export class ValheimWorld extends cdk.Construct {
  public backupPlan: backup.BackupPlan;
  public fileSystem: efs.FileSystem;
  public schedules?: ValheimWorldScalingSchedule[];
  public service: ecs.FargateService;

  constructor(scope: cdk.Construct, id: string, props?: ValheimWorldProps) {
    super(scope, id);

    const vpc = props?.vpc ?? ec2.Vpc.fromLookup(this, 'DefaultVpc', {
      isDefault: true,
    });

    const cluster = new ecs.Cluster(this, 'ValheimCluster', { vpc });

    this.fileSystem = props?.fileSystem ?? new efs.FileSystem(this, 'ValheimSaveDataEFS', {
      vpc,
      lifecyclePolicy: efs.LifecyclePolicy.AFTER_14_DAYS,
    });

    const volumeConfig = {
      name: 'valheim-save-data',
      efsVolumeConfiguration: {
        fileSystemId: this.fileSystem.fileSystemId,
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
      desiredCount: props?.desiredCount,
    });

    // Allow TCP 2049 for EFS
    this.service.connections.allowFrom(this.fileSystem, ec2.Port.tcp(2049));
    this.service.connections.allowTo(this.fileSystem, ec2.Port.tcp(2049));

    // Allow UDP 2456-2458 for Valheim
    this.service.connections.allowFrom(ec2.Peer.anyIpv4(), ec2.Port.udpRange(2456, 2458));

    if (props?.schedules != null) {
      let schedules: ValheimWorldScalingSchedule[] = [];
      const capacity = props?.desiredCount ?? 1;
      const taskCount = this.service.autoScaleTaskCount({
        maxCapacity: capacity,
      });
      props?.schedules.forEach((schedule, index) => {
        taskCount.scaleOnSchedule(`ValheimWorldStartAt${index}`, {
          schedule: appscaling.Schedule.cron(schedule.startAt),
          minCapacity: capacity,
          maxCapacity: capacity,
        });
        taskCount.scaleOnSchedule(`ValheimWorldStopAt${index}`, {
          schedule: appscaling.Schedule.cron(schedule.stopAt),
          minCapacity: 0,
          maxCapacity: 0,
        });
        schedules.push(new ValheimWorldScalingSchedule(schedule));
      });
      this.schedules = schedules;
    }

    this.backupPlan = props?.backupPlan ?? this.defaultBackupPlan();

    new cdk.CfnOutput(this, 'ValheimServiceArn', {
      value: this.service.serviceArn,
    });
  }

  // Default backup plan runs every hour
  private defaultBackupPlan(): backup.BackupPlan {
    const backupPlan = new backup.BackupPlan(this, 'ValheimSaveDataBackupPlan');
    backupPlan.addSelection('ValheimBackupSelection', {
      resources: [backup.BackupResource.fromEfsFileSystem(this.fileSystem)],
    });
    const defaultSchedule = { toCronOptions: () => { return { minute: '0' }; } };
    for (const schedule of this.schedules ?? [defaultSchedule]) {
      backupPlan.addRule(new backup.BackupPlanRule({
        deleteAfter: cdk.Duration.days(3),
        scheduleExpression: events.Schedule.cron(schedule.toCronOptions()),
      }));
    }
    return backupPlan;
  }
}
