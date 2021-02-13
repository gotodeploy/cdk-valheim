# cdk-valheim

A high level CDK construct of [Valheim](https://www.valheimgame.com/) dedicated server.

## API

See [API.md](API.md)

## Example

```ts
new ValheimWorld(stack, 'ValheimWorld', {
  cpu: 2048,
  memoryLimitMiB: 4096,
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
```

## Testing

* Snapshot

```sh
yarn test
```

* Integration

```sh
npx cdk -a "npx ts-node src/integ.valheim.ts" diff
npx cdk -a "npx ts-node src/integ.valheim.ts" deploy
```
