import { SynthUtils } from '@aws-cdk/assert';
import { Vpc } from '@aws-cdk/aws-ec2';
import { Stack } from '@aws-cdk/core';

import { ValheimWorld, ValheimWorldScalingSchedule } from '../src';

test('ValheimWorldSnapshot', () => {
  const stack = new Stack();
  const vpc = new Vpc(stack, 'vpc');
  new ValheimWorld(stack, 'ValheimWorld', { vpc });

  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});

test.each`
start | stop  | expected
${1}  | ${7}  | ${[1, 2, 3, 4, 5, 6, 7]}
${0}  | ${23} | ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}
`('range function generates $expected array of numbers', ({ start, stop, expected }) => {
  // eslint-disable-next-line
  expect(ValheimWorldScalingSchedule['range'](start, stop)).toEqual(expected);
});

test.each`
expression | range                     | expected
${'4'}     | ${[1, 2, 3, 4, 5, 6, 7]}  | ${Uint8Array.from([4])}
${'1,3,6'} | ${[1, 2, 3, 4, 5, 6, 7]}  | ${Uint8Array.from([1, 3, 6])}
${'4-6'}   | ${[1, 2, 3, 4, 5, 6, 7]}  | ${Uint8Array.from([4, 5, 6])}
`('Parse cron $expression into Uint8Array $expected', ({ expression, range, expected }) => {
  // eslint-disable-next-line
  expect(ValheimWorldScalingSchedule['toIntArraySorted'](expression, range)).toEqual(expected);
});

test.each`
start                   | stop                    | expected
${{ hour: undefined }}  | ${{ hour: undefined }}  | ${{ minute: '0' }}
${{ hour: '0' }}        | ${{ hour: '9' }}        | ${{ minute: '0', hour: '0-9' }}
${{ hour: '15' }}       | ${{ hour: '3' }}        | ${{ minute: '0', hour: '15-23,0-3' }}
${{ hour: '3,15' }}     | ${{ hour: '9,0' }}      | ${{ minute: '0', hour: '3-23,0-0' }}
${{ hour: '0' }}        | ${{ hour: '23' }}       | ${{ minute: '0', hour: '0-23' }}
${{ weekDay: '2' }}     | ${{ weekDay: '4' }}     | ${{ minute: '0', weekDay: '2-4' }}
${{ weekDay: '1,3' }}   | ${{ weekDay: '1,3' }}   | ${{ minute: '0', weekDay: '1,3' }}
${{ weekDay: '1-4' }}   | ${{ weekDay: '1-4' }}   | ${{ minute: '0', weekDay: '1,2,3,4' }}
${{ weekDay: '1,3-5' }} | ${{ weekDay: '1,3-5' }} | ${{ minute: '0', weekDay: '1,3,4,5' }}
${{ weekDay: '6' }}     | ${{ weekDay: '1' }}     | ${{ minute: '0', weekDay: '6-7,1-1' }}
`('Combines $start and $stop to generate $expected crontab string', ({ start, stop, expected }) => {
  const schedule = new ValheimWorldScalingSchedule({ start, stop });
  expect(schedule.toCronOptions()).toEqual(expected);
});

test.each`
start                           | stop
${{ hour: undefined }}          | ${{ hour: '9' }}
${{ hour: '9' }}                | ${{ hour: undefined }}
${{ minute: '0', second: '0' }} | ${{ hour: '9' }}
${{ hour: '' }}                 | ${{ hour: '9' }}
${{ hour: 'a' }}                | ${{ hour: '9' }}
${{ hour: '0/1' }}              | ${{ hour: '9' }}
${{ hour: '0' }}                | ${{ hour: '9-18' }}
${{ hour: '0' }}                | ${{ hour: '9,10' }}
`('Invalid $start and $stop causes Error', ({ start, stop }) => {
  const schedule = new ValheimWorldScalingSchedule({ start, stop });
  expect(() => {
    schedule.toCronOptions();
  }).toThrow();
});

