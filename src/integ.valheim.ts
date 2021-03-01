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
    start: { hour: '12', weekDay: '1-4' },
    stop: { hour: '1', weekDay: '1-4' },
  },
  // It's friday night ;)
  {
    start: { hour: '12', weekDay: '5' },
    stop: { hour: '4', weekDay: '5' },
  },
  // It's weekend.
  {
    start: { weekDay: '6' },
    stop: { weekDay: '1' },
  }],
  environment: {
    SERVER_NAME: 'CDK Valheim',
    WORLD_NAME: 'Amazon',
    SERVER_PASS: 'fargate',
  },
});
