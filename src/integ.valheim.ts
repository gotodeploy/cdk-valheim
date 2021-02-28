import { App, Stack } from '@aws-cdk/core';
import { ValheimWorld } from './index';

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();
const stack = new Stack(app, 'ValheimStack', { env });

new ValheimWorld(stack, 'ValheimWorld', {
  // Warning: It's UTC.
  schedules: [{
    startAt: { hour: '12', weekDay: '0-3' },
    stopAt: { hour: '1', weekDay: '0-3' },
  },
  // It's friday night ;)
  {
    startAt: { hour: '12', weekDay: '4' },
    stopAt: { hour: '4', weekDay: '4' },
  },
  // It's weekend.
  {
    startAt: { weekDay: '5' },
    stopAt: { weekDay: '0' },
  }],
  environment: {
    SERVER_NAME: 'CDK Valheim',
    WORLD_NAME: 'Amazon',
    SERVER_PASS: 'fargate',
  },
});
