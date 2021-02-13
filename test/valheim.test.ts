import { SynthUtils } from '@aws-cdk/assert';
import { Vpc } from '@aws-cdk/aws-ec2';
import { Stack } from '@aws-cdk/core';

import { ValheimWorld } from '../src';

test('ValheimWorldSnapshot', () => {
  const stack = new Stack();
  const vpc = new Vpc(stack, 'vpc');
  new ValheimWorld(stack, 'ValheimWorld', { vpc });

  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});