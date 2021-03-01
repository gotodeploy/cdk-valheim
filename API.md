# API Reference

**Classes**

Name|Description
----|-----------
[ValheimWorld](#cdk-valheim-valheimworld)|*No description*
[ValheimWorldScalingSchedule](#cdk-valheim-valheimworldscalingschedule)|Represents the schedule to determine when the server starts or terminates.


**Structs**

Name|Description
----|-----------
[ValheimWorldProps](#cdk-valheim-valheimworldprops)|*No description*
[ValheimWorldScalingScheduleProps](#cdk-valheim-valheimworldscalingscheduleprops)|Options for ValheimWorldScalingSchedule.



## class ValheimWorld  <a id="cdk-valheim-valheimworld"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new ValheimWorld(scope: Construct, id: string, props?: ValheimWorldProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ValheimWorldProps](#cdk-valheim-valheimworldprops)</code>)  *No description*
  * **backupPlan** (<code>[BackupPlan](#aws-cdk-aws-backup-backupplan)</code>)  AWS Backup plan for EFS. __*Default*__: Hourly backup with 3 days retension.
  * **containerPath** (<code>string</code>)  The path on the container to mount the host volume at. __*Default*__: /config/
  * **cpu** (<code>number</code>)  The number of cpu units used by the task. __*Default*__: 1024
  * **desiredCount** (<code>number</code>)  Desired count of Fargate container. __*Default*__: 1
  * **environment** (<code>Map<string, string></code>)  The environment variables to pass to the container. __*Default*__: No environment variables.
  * **fileSystem** (<code>[FileSystem](#aws-cdk-aws-efs-filesystem)</code>)  Persistent storage for save data. __*Default*__: Amazon EFS for default persistent storage.
  * **image** (<code>[ContainerImage](#aws-cdk-aws-ecs-containerimage)</code>)  The image used to start a container. __*Default*__: [lloesche/valheim-server](https://hub.docker.com/r/lloesche/valheim-server)
  * **logGroup** (<code>[LogDriver](#aws-cdk-aws-ecs-logdriver)</code>)  Valheim Server log Group. __*Default*__: Create the new AWS Cloudwatch Log Group for Valheim Server.
  * **memoryLimitMiB** (<code>number</code>)  The amount (in MiB) of memory used by the task. __*Default*__: 2048
  * **schedules** (<code>Array<[ValheimWorldScalingScheduleProps](#cdk-valheim-valheimworldscalingscheduleprops)></code>)  Running schedules. __*Default*__: Always running.
  * **vpc** (<code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code>)  The VPC where your ECS instances will be running or your ENIs will be deployed. __*Default*__: creates a new VPC with two AZs



### Properties


Name | Type | Description 
-----|------|-------------
**backupPlan** | <code>[BackupPlan](#aws-cdk-aws-backup-backupplan)</code> | <span></span>
**fileSystem** | <code>[FileSystem](#aws-cdk-aws-efs-filesystem)</code> | <span></span>
**service** | <code>[FargateService](#aws-cdk-aws-ecs-fargateservice)</code> | <span></span>
**schedules**? | <code>Array<[ValheimWorldScalingSchedule](#cdk-valheim-valheimworldscalingschedule)></code> | __*Optional*__



## class ValheimWorldScalingSchedule  <a id="cdk-valheim-valheimworldscalingschedule"></a>

Represents the schedule to determine when the server starts or terminates.


### Initializer




```ts
new ValheimWorldScalingSchedule(schedule: ValheimWorldScalingScheduleProps)
```

* **schedule** (<code>[ValheimWorldScalingScheduleProps](#cdk-valheim-valheimworldscalingscheduleprops)</code>)  *No description*
  * **start** (<code>[CronOptions](#aws-cdk-aws-applicationautoscaling-cronoptions)</code>)  Options to configure a cron expression for server for server launching schedule. 
  * **stop** (<code>[CronOptions](#aws-cdk-aws-applicationautoscaling-cronoptions)</code>)  Options to configure a cron expression for server zero-scale schedule. 



### Properties


Name | Type | Description 
-----|------|-------------
**start** | <code>[CronOptions](#aws-cdk-aws-applicationautoscaling-cronoptions)</code> | Options to configure a cron expression for server for server launching schedule.
**stop** | <code>[CronOptions](#aws-cdk-aws-applicationautoscaling-cronoptions)</code> | Options to configure a cron expression for server zero-scale schedule.

### Methods


#### toCronOptions() <a id="cdk-valheim-valheimworldscalingschedule-tocronoptions"></a>

Returns the cron options merged properties for both start and stop.

```ts
toCronOptions(): CronOptions
```


__Returns__:
* <code>[CronOptions](#aws-cdk-aws-applicationautoscaling-cronoptions)</code>



## struct ValheimWorldProps  <a id="cdk-valheim-valheimworldprops"></a>






Name | Type | Description 
-----|------|-------------
**backupPlan**? | <code>[BackupPlan](#aws-cdk-aws-backup-backupplan)</code> | AWS Backup plan for EFS.<br/>__*Default*__: Hourly backup with 3 days retension.
**containerPath**? | <code>string</code> | The path on the container to mount the host volume at.<br/>__*Default*__: /config/
**cpu**? | <code>number</code> | The number of cpu units used by the task.<br/>__*Default*__: 1024
**desiredCount**? | <code>number</code> | Desired count of Fargate container.<br/>__*Default*__: 1
**environment**? | <code>Map<string, string></code> | The environment variables to pass to the container.<br/>__*Default*__: No environment variables.
**fileSystem**? | <code>[FileSystem](#aws-cdk-aws-efs-filesystem)</code> | Persistent storage for save data.<br/>__*Default*__: Amazon EFS for default persistent storage.
**image**? | <code>[ContainerImage](#aws-cdk-aws-ecs-containerimage)</code> | The image used to start a container.<br/>__*Default*__: [lloesche/valheim-server](https://hub.docker.com/r/lloesche/valheim-server)
**logGroup**? | <code>[LogDriver](#aws-cdk-aws-ecs-logdriver)</code> | Valheim Server log Group.<br/>__*Default*__: Create the new AWS Cloudwatch Log Group for Valheim Server.
**memoryLimitMiB**? | <code>number</code> | The amount (in MiB) of memory used by the task.<br/>__*Default*__: 2048
**schedules**? | <code>Array<[ValheimWorldScalingScheduleProps](#cdk-valheim-valheimworldscalingscheduleprops)></code> | Running schedules.<br/>__*Default*__: Always running.
**vpc**? | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | The VPC where your ECS instances will be running or your ENIs will be deployed.<br/>__*Default*__: creates a new VPC with two AZs



## struct ValheimWorldScalingScheduleProps  <a id="cdk-valheim-valheimworldscalingscheduleprops"></a>


Options for ValheimWorldScalingSchedule.



Name | Type | Description 
-----|------|-------------
**start** | <code>[CronOptions](#aws-cdk-aws-applicationautoscaling-cronoptions)</code> | Options to configure a cron expression for server for server launching schedule.
**stop** | <code>[CronOptions](#aws-cdk-aws-applicationautoscaling-cronoptions)</code> | Options to configure a cron expression for server zero-scale schedule.



