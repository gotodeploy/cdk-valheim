import {
  App,
  Stack,
  aws_ecs as ecs,
} from 'aws-cdk-lib';
import { ValheimWorld } from './index';

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();
const stack = new Stack(app, 'ValheimStack', { env });

new ValheimWorld(stack, 'ValheimWorld', {
  image: ecs.ContainerImage.fromRegistry('mbround18/valheim'),
  containerPath: '/home/steam/.config/unity3d/IronGate/Valheim',
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
    PORT: '2456',
    NAME: 'CDK Valheim',
    WORLD: 'Amazon',
    PASSWORD: 'fargate',
  },
});
