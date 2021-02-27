# cdk-valheim

A high level CDK construct of [Valheim](https://www.valheimgame.com/) dedicated server.

## API

See [API.md](API.md)

## Example

```ts
new ValheimWorld(stack, 'ValheimWorld', {
  cpu: 2048,
  memoryLimitMiB: 4096,
  schedules: [{
    startAt: { hour: '12', weekDay: '0-3' },
    stopAt: { hour: '1', weekDay: '0-3' },
  }],
  environment: {
    SERVER_NAME: 'CDK Valheim',
    WORLD_NAME: 'Amazon',
    SERVER_PASS: 'fargate',
    BACKUPS: 'false',
    // SERVER_PORT: '2456',
    // SERVER_PUBLIC: 'true',
    // UPDATE_CRON: '*/15 * * * *',
    // RESTART_CRON: '0 5 * * *',
    // TZ: 'Etc/UTC',
    // BACKUPS_CRON: '0 * * * *',
    // BACKUPS_DIRECTORY: '/config/backups',
    // BACKUPS_MAX_AGE: '3',
    // PERMISSIONS_UMASK: '022',
    // STEAMCMD_ARGS: 'validate',
    // VALHEIM_PLUS: 'false',
  },
});
```

## Testing

* Snapshot

```sh
npx projen test
```

* Integration

```sh
npx cdk -a "npx ts-node src/integ.valheim.ts" diff
npx cdk -a "npx ts-node src/integ.valheim.ts" deploy
```
