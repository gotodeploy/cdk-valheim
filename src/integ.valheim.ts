import * as appscaling from '@aws-cdk/aws-applicationautoscaling';
import { App, Stack } from '@aws-cdk/core';
import { ValheimWorld } from './index';

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();
const stack = new Stack(app, 'ValheimStack', { env });

const valheimWorld = new ValheimWorld(stack, 'ValheimWorld', {
  environment: {
    SERVER_NAME: 'CDK Valheim',
    WORLD_NAME: 'Amazon',
    SERVER_PASS: 'fargate',
    // SERVER_PUBLIC: 1,
    // UPDATE_INTERVAL: 900,
    // BACKUPS_INTERVAL: 3600,
    // BACKUPS_DIRECTORY: '/config/backups',
    // BACKUPS_MAX_AGE: 3,
    // BACKUPS_DIRECTORY_PERMISSIONS: 755,
    // BACKUPS_FILE_PERMISSIONS: 644,
    // CONFIG_DIRECTORY_PERMISSIONS: 755,
    // WORLDS_DIRECTORY_PERMISSIONS: 755,
    // WORLDS_FILE_PERMISSIONS: 644,
  },
});

const taskCount = valheimWorld.service.autoScaleTaskCount({
  maxCapacity: 1,
});

// Warning: It's UTC
taskCount.scaleOnSchedule('StopAtMidnigt', {
  schedule: appscaling.Schedule.cron({ hour: '0' }),
  minCapacity: 0,
  maxCapacity: 0,
});

taskCount.scaleOnSchedule('StartAtMorning', {
  schedule: appscaling.Schedule.cron({ hour: '9' }),
  minCapacity: 1,
  maxCapacity: 1,
});
