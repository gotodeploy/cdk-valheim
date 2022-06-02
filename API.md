# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### ValheimWorld <a name="ValheimWorld" id="cdk-valheim.ValheimWorld"></a>

#### Initializers <a name="Initializers" id="cdk-valheim.ValheimWorld.Initializer"></a>

```typescript
import { ValheimWorld } from 'cdk-valheim'

new ValheimWorld(scope: Construct, id: string, props?: ValheimWorldProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-valheim.ValheimWorld.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-valheim.ValheimWorld.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-valheim.ValheimWorld.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-valheim.ValheimWorldProps">ValheimWorldProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-valheim.ValheimWorld.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-valheim.ValheimWorld.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="cdk-valheim.ValheimWorld.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-valheim.ValheimWorldProps">ValheimWorldProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-valheim.ValheimWorld.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-valheim.ValheimWorld.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-valheim.ValheimWorld.property.backupPlan">backupPlan</a></code> | <code>aws-cdk-lib.aws_backup.BackupPlan</code> | *No description.* |
| <code><a href="#cdk-valheim.ValheimWorld.property.fileSystem">fileSystem</a></code> | <code>aws-cdk-lib.aws_efs.FileSystem</code> | *No description.* |
| <code><a href="#cdk-valheim.ValheimWorld.property.service">service</a></code> | <code>aws-cdk-lib.aws_ecs.FargateService</code> | *No description.* |
| <code><a href="#cdk-valheim.ValheimWorld.property.schedules">schedules</a></code> | <code><a href="#cdk-valheim.ValheimWorldScalingSchedule">ValheimWorldScalingSchedule</a>[]</code> | *No description.* |

---

##### `backupPlan`<sup>Required</sup> <a name="backupPlan" id="cdk-valheim.ValheimWorld.property.backupPlan"></a>

```typescript
public readonly backupPlan: BackupPlan;
```

- *Type:* aws-cdk-lib.aws_backup.BackupPlan

---

##### `fileSystem`<sup>Required</sup> <a name="fileSystem" id="cdk-valheim.ValheimWorld.property.fileSystem"></a>

```typescript
public readonly fileSystem: FileSystem;
```

- *Type:* aws-cdk-lib.aws_efs.FileSystem

---

##### `service`<sup>Required</sup> <a name="service" id="cdk-valheim.ValheimWorld.property.service"></a>

```typescript
public readonly service: FargateService;
```

- *Type:* aws-cdk-lib.aws_ecs.FargateService

---

##### `schedules`<sup>Optional</sup> <a name="schedules" id="cdk-valheim.ValheimWorld.property.schedules"></a>

```typescript
public readonly schedules: ValheimWorldScalingSchedule[];
```

- *Type:* <a href="#cdk-valheim.ValheimWorldScalingSchedule">ValheimWorldScalingSchedule</a>[]

---


## Structs <a name="Structs" id="Structs"></a>

### ValheimWorldProps <a name="ValheimWorldProps" id="cdk-valheim.ValheimWorldProps"></a>

#### Initializer <a name="Initializer" id="cdk-valheim.ValheimWorldProps.Initializer"></a>

```typescript
import { ValheimWorldProps } from 'cdk-valheim'

const valheimWorldProps: ValheimWorldProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-valheim.ValheimWorldProps.property.backupPlan">backupPlan</a></code> | <code>aws-cdk-lib.aws_backup.BackupPlan</code> | AWS Backup plan for EFS. |
| <code><a href="#cdk-valheim.ValheimWorldProps.property.containerPath">containerPath</a></code> | <code>string</code> | The path on the container to mount the host volume at. |
| <code><a href="#cdk-valheim.ValheimWorldProps.property.cpu">cpu</a></code> | <code>number</code> | The number of cpu units used by the task. |
| <code><a href="#cdk-valheim.ValheimWorldProps.property.desiredCount">desiredCount</a></code> | <code>number</code> | Desired count of Fargate container. |
| <code><a href="#cdk-valheim.ValheimWorldProps.property.environment">environment</a></code> | <code>{[ key: string ]: string}</code> | The environment variables to pass to the container. |
| <code><a href="#cdk-valheim.ValheimWorldProps.property.fileSystem">fileSystem</a></code> | <code>aws-cdk-lib.aws_efs.FileSystem</code> | Persistent storage for save data. |
| <code><a href="#cdk-valheim.ValheimWorldProps.property.image">image</a></code> | <code>aws-cdk-lib.aws_ecs.ContainerImage</code> | The image used to start a container. |
| <code><a href="#cdk-valheim.ValheimWorldProps.property.logGroup">logGroup</a></code> | <code>aws-cdk-lib.aws_ecs.LogDriver</code> | Valheim Server log Group. |
| <code><a href="#cdk-valheim.ValheimWorldProps.property.memoryLimitMiB">memoryLimitMiB</a></code> | <code>number</code> | The amount (in MiB) of memory used by the task. |
| <code><a href="#cdk-valheim.ValheimWorldProps.property.schedules">schedules</a></code> | <code><a href="#cdk-valheim.ValheimWorldScalingScheduleProps">ValheimWorldScalingScheduleProps</a>[]</code> | Running schedules. |
| <code><a href="#cdk-valheim.ValheimWorldProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | The VPC where your ECS instances will be running or your ENIs will be deployed. |

---

##### `backupPlan`<sup>Optional</sup> <a name="backupPlan" id="cdk-valheim.ValheimWorldProps.property.backupPlan"></a>

```typescript
public readonly backupPlan: BackupPlan;
```

- *Type:* aws-cdk-lib.aws_backup.BackupPlan
- *Default:* Hourly backup with 3 days retension.

AWS Backup plan for EFS.

---

##### `containerPath`<sup>Optional</sup> <a name="containerPath" id="cdk-valheim.ValheimWorldProps.property.containerPath"></a>

```typescript
public readonly containerPath: string;
```

- *Type:* string
- *Default:* /config/

The path on the container to mount the host volume at.

---

##### `cpu`<sup>Optional</sup> <a name="cpu" id="cdk-valheim.ValheimWorldProps.property.cpu"></a>

```typescript
public readonly cpu: number;
```

- *Type:* number
- *Default:* 1024

The number of cpu units used by the task.

For tasks using the Fargate launch type,
this field is required and you must use one of the following values,
which determines your range of valid values for the memory parameter:

256 (.25 vCPU) - Available memory values: 512 (0.5 GB), 1024 (1 GB), 2048 (2 GB)

512 (.5 vCPU) - Available memory values: 1024 (1 GB), 2048 (2 GB), 3072 (3 GB), 4096 (4 GB)

1024 (1 vCPU) - Available memory values: 2048 (2 GB), 3072 (3 GB), 4096 (4 GB), 5120 (5 GB), 6144 (6 GB), 7168 (7 GB), 8192 (8 GB)

2048 (2 vCPU) - Available memory values: Between 4096 (4 GB) and 16384 (16 GB) in increments of 1024 (1 GB)

4096 (4 vCPU) - Available memory values: Between 8192 (8 GB) and 30720 (30 GB) in increments of 1024 (1 GB)

---

##### `desiredCount`<sup>Optional</sup> <a name="desiredCount" id="cdk-valheim.ValheimWorldProps.property.desiredCount"></a>

```typescript
public readonly desiredCount: number;
```

- *Type:* number
- *Default:* 1

Desired count of Fargate container.

Set 0 for maintenance.

---

##### `environment`<sup>Optional</sup> <a name="environment" id="cdk-valheim.ValheimWorldProps.property.environment"></a>

```typescript
public readonly environment: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* No environment variables.

The environment variables to pass to the container.

---

##### `fileSystem`<sup>Optional</sup> <a name="fileSystem" id="cdk-valheim.ValheimWorldProps.property.fileSystem"></a>

```typescript
public readonly fileSystem: FileSystem;
```

- *Type:* aws-cdk-lib.aws_efs.FileSystem
- *Default:* Amazon EFS for default persistent storage.

Persistent storage for save data.

---

##### `image`<sup>Optional</sup> <a name="image" id="cdk-valheim.ValheimWorldProps.property.image"></a>

```typescript
public readonly image: ContainerImage;
```

- *Type:* aws-cdk-lib.aws_ecs.ContainerImage
- *Default:* [lloesche/valheim-server](https://hub.docker.com/r/lloesche/valheim-server)

The image used to start a container.

This string is passed directly to the Docker daemon.
Images in the Docker Hub registry are available by default.
Other repositories are specified with either repository-url/image:tag or repository-url/image@digest.

---

##### `logGroup`<sup>Optional</sup> <a name="logGroup" id="cdk-valheim.ValheimWorldProps.property.logGroup"></a>

```typescript
public readonly logGroup: LogDriver;
```

- *Type:* aws-cdk-lib.aws_ecs.LogDriver
- *Default:* Create the new AWS Cloudwatch Log Group for Valheim Server.

Valheim Server log Group.

---

##### `memoryLimitMiB`<sup>Optional</sup> <a name="memoryLimitMiB" id="cdk-valheim.ValheimWorldProps.property.memoryLimitMiB"></a>

```typescript
public readonly memoryLimitMiB: number;
```

- *Type:* number
- *Default:* 2048

The amount (in MiB) of memory used by the task.

For tasks using the Fargate launch type,
this field is required and you must use one of the following values, which determines your range of valid values for the cpu parameter:

512 (0.5 GB), 1024 (1 GB), 2048 (2 GB) - Available cpu values: 256 (.25 vCPU)

1024 (1 GB), 2048 (2 GB), 3072 (3 GB), 4096 (4 GB) - Available cpu values: 512 (.5 vCPU)

2048 (2 GB), 3072 (3 GB), 4096 (4 GB), 5120 (5 GB), 6144 (6 GB), 7168 (7 GB), 8192 (8 GB) - Available cpu values: 1024 (1 vCPU)

Between 4096 (4 GB) and 16384 (16 GB) in increments of 1024 (1 GB) - Available cpu values: 2048 (2 vCPU)

Between 8192 (8 GB) and 30720 (30 GB) in increments of 1024 (1 GB) - Available cpu values: 4096 (4 vCPU)

---

##### `schedules`<sup>Optional</sup> <a name="schedules" id="cdk-valheim.ValheimWorldProps.property.schedules"></a>

```typescript
public readonly schedules: ValheimWorldScalingScheduleProps[];
```

- *Type:* <a href="#cdk-valheim.ValheimWorldScalingScheduleProps">ValheimWorldScalingScheduleProps</a>[]
- *Default:* Always running.

Running schedules.

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="cdk-valheim.ValheimWorldProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc
- *Default:* creates a new VPC with two AZs

The VPC where your ECS instances will be running or your ENIs will be deployed.

---

### ValheimWorldScalingScheduleProps <a name="ValheimWorldScalingScheduleProps" id="cdk-valheim.ValheimWorldScalingScheduleProps"></a>

Options for ValheimWorldScalingSchedule.

#### Initializer <a name="Initializer" id="cdk-valheim.ValheimWorldScalingScheduleProps.Initializer"></a>

```typescript
import { ValheimWorldScalingScheduleProps } from 'cdk-valheim'

const valheimWorldScalingScheduleProps: ValheimWorldScalingScheduleProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-valheim.ValheimWorldScalingScheduleProps.property.start">start</a></code> | <code>aws-cdk-lib.aws_applicationautoscaling.CronOptions</code> | Options to configure a cron expression for server for server launching schedule. |
| <code><a href="#cdk-valheim.ValheimWorldScalingScheduleProps.property.stop">stop</a></code> | <code>aws-cdk-lib.aws_applicationautoscaling.CronOptions</code> | Options to configure a cron expression for server zero-scale schedule. |

---

##### `start`<sup>Required</sup> <a name="start" id="cdk-valheim.ValheimWorldScalingScheduleProps.property.start"></a>

```typescript
public readonly start: CronOptions;
```

- *Type:* aws-cdk-lib.aws_applicationautoscaling.CronOptions

Options to configure a cron expression for server for server launching schedule.

All fields are strings so you can use complex expressions. Absence of
a field implies '*' or '?', whichever one is appropriate. Only comma
separated numbers and hypens are allowed.

---

##### `stop`<sup>Required</sup> <a name="stop" id="cdk-valheim.ValheimWorldScalingScheduleProps.property.stop"></a>

```typescript
public readonly stop: CronOptions;
```

- *Type:* aws-cdk-lib.aws_applicationautoscaling.CronOptions

Options to configure a cron expression for server zero-scale schedule.

All fields are strings so you can use complex expressions. Absence of
a field implies '*' or '?', whichever one is appropriate. Only comma
separated numbers and hypens are allowed.

---

## Classes <a name="Classes" id="Classes"></a>

### ValheimWorldScalingSchedule <a name="ValheimWorldScalingSchedule" id="cdk-valheim.ValheimWorldScalingSchedule"></a>

Represents the schedule to determine when the server starts or terminates.

#### Initializers <a name="Initializers" id="cdk-valheim.ValheimWorldScalingSchedule.Initializer"></a>

```typescript
import { ValheimWorldScalingSchedule } from 'cdk-valheim'

new ValheimWorldScalingSchedule(schedule: ValheimWorldScalingScheduleProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-valheim.ValheimWorldScalingSchedule.Initializer.parameter.schedule">schedule</a></code> | <code><a href="#cdk-valheim.ValheimWorldScalingScheduleProps">ValheimWorldScalingScheduleProps</a></code> | *No description.* |

---

##### `schedule`<sup>Required</sup> <a name="schedule" id="cdk-valheim.ValheimWorldScalingSchedule.Initializer.parameter.schedule"></a>

- *Type:* <a href="#cdk-valheim.ValheimWorldScalingScheduleProps">ValheimWorldScalingScheduleProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-valheim.ValheimWorldScalingSchedule.toCronOptions">toCronOptions</a></code> | Returns the cron options merged properties for both start and stop. |

---

##### `toCronOptions` <a name="toCronOptions" id="cdk-valheim.ValheimWorldScalingSchedule.toCronOptions"></a>

```typescript
public toCronOptions(): CronOptions
```

Returns the cron options merged properties for both start and stop.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-valheim.ValheimWorldScalingSchedule.property.start">start</a></code> | <code>aws-cdk-lib.aws_applicationautoscaling.CronOptions</code> | Options to configure a cron expression for server for server launching schedule. |
| <code><a href="#cdk-valheim.ValheimWorldScalingSchedule.property.stop">stop</a></code> | <code>aws-cdk-lib.aws_applicationautoscaling.CronOptions</code> | Options to configure a cron expression for server zero-scale schedule. |

---

##### `start`<sup>Required</sup> <a name="start" id="cdk-valheim.ValheimWorldScalingSchedule.property.start"></a>

```typescript
public readonly start: CronOptions;
```

- *Type:* aws-cdk-lib.aws_applicationautoscaling.CronOptions

Options to configure a cron expression for server for server launching schedule.

All fields are strings so you can use complex expressions. Absence of
a field implies '*' or '?', whichever one is appropriate. Only comma
separated numbers and hypens are allowed.

---

##### `stop`<sup>Required</sup> <a name="stop" id="cdk-valheim.ValheimWorldScalingSchedule.property.stop"></a>

```typescript
public readonly stop: CronOptions;
```

- *Type:* aws-cdk-lib.aws_applicationautoscaling.CronOptions

Options to configure a cron expression for server zero-scale schedule.

All fields are strings so you can use complex expressions. Absence of
a field implies '*' or '?', whichever one is appropriate. Only comma
separated numbers and hypens are allowed.

---



