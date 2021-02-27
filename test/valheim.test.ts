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
${0}  | ${6}  | ${[0, 1, 2, 3, 4, 5, 6]}
${0}  | ${23} | ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}
`('range function generates $expected array of numbers', ({ start, stop, expected }) => {
  // eslint-disable-next-line
  expect(ValheimWorldScalingSchedule['range'](start, stop)).toEqual(expected);
});

test.each`
expression | range                     | expected
${'4'}     | ${[0, 1, 2, 3, 4, 5, 6]}  | ${Uint8Array.from([4])}
${'1,3,6'} | ${[0, 1, 2, 3, 4, 5, 6]}  | ${Uint8Array.from([1, 3, 6])}
${'4-6'}   | ${[0, 1, 2, 3, 4, 5, 6]}  | ${Uint8Array.from([4, 5, 6])}
`('', ({ expression, range, expected }) => {
  // eslint-disable-next-line
  expect(ValheimWorldScalingSchedule['toIntArraySorted'](expression, range)).toEqual(expected);
});

test.each`
startAt                 | stopAt                  | expected
${{ hour: undefined }}  | ${{ hour: undefined }}  | ${{}}
${{ hour: '0' }}        | ${{ hour: '9' }}        | ${{ hour: '0-9' }}
${{ hour: '15' }}       | ${{ hour: '3' }}        | ${{ hour: '15-23,0-3' }}
${{ hour: '3,15' }}     | ${{ hour: '9,0' }}      | ${{ hour: '3-23,0-0' }}
${{ hour: '0' }}        | ${{ hour: '23' }}       | ${{ hour: '0-23' }}
${{ weekDay: '2' }}     | ${{ weekDay: '4' }}     | ${{ weekDay: '2-4' }}
${{ weekDay: '0,3' }}   | ${{ weekDay: '0,3' }}   | ${{ weekDay: '0,3' }}
${{ weekDay: '0-4' }}   | ${{ weekDay: '0-4' }}   | ${{ weekDay: '0,1,2,3,4' }}
${{ weekDay: '0,3-5' }} | ${{ weekDay: '0,3-5' }} | ${{ weekDay: '0,3,4,5' }}
${{ weekDay: '5' }}     | ${{ weekDay: '0' }}     | ${{ weekDay: '5-6,0-0' }}
`('Combines $startAt and $stopAt to generate $expected crontab string', ({ startAt, stopAt, expected }) => {
  const schedule = new ValheimWorldScalingSchedule({ startAt, stopAt });
  expect(schedule.toCronOptions()).toEqual(expected);
});

test.each`
startAt                         | stopAt
${{ hour: undefined }}          | ${{ hour: '9' }}
${{ hour: '9' }}                | ${{ hour: undefined }}
${{ minute: '0', second: '0' }} | ${{ hour: '9' }}
${{ hour: '' }}                 | ${{ hour: '9' }}
${{ hour: 'a' }}                | ${{ hour: '9' }}
${{ hour: '0/1' }}              | ${{ hour: '9' }}
${{ hour: '0' }}                | ${{ hour: '9-18' }}
${{ hour: '0' }}                | ${{ hour: '9,10' }}
`('Invalid $startAt and $stopAt causes Error', ({ startAt, stopAt }) => {
  const schedule = new ValheimWorldScalingSchedule({ startAt, stopAt });
  expect(() => {
    schedule.toCronOptions();
  }).toThrow();
});

