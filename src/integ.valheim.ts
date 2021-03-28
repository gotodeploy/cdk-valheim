import * as ecs from '@aws-cdk/aws-ecs';
import { App, Stack } from '@aws-cdk/core';
import { ValheimWorld, Hammer } from './index';

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();
const stack = new Stack(app, 'ValheimStack', { env });

const world = new ValheimWorld(stack, 'ValheimWorld', {
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

// e.g. npx cdk -a "npx ts-node src/integ.valheim.ts" -c APPLICATION_PUBLIC_KEY=foo diff
const applicationPublicKey = stack.node.tryGetContext('APPLICATION_PUBLIC_KEY');

if (applicationPublicKey != null) {
  new Hammer(stack, 'Hammer', {
    applicationPublicKey,
    ecsClusterArn: world.service.cluster.clusterArn,
    ecsServiceName: world.service.serviceName,
  });
}
