const { awscdk } = require('projen');

const project = new awscdk.AwsCdkConstructLibrary({
  authorName: 'gotodeploy',
  authorAddress: '1491134+gotodeploy@users.noreply.github.com',
  cdkVersion: '2.15.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-valheim',
  repositoryUrl: 'https://github.com/gotodeploy/cdk-valheim.git',
  devDeps: [
    'cdk-dia',
  ],
  license: 'Apache-2.0',
  gitignore: [
    'cdk.context.json',
    'cdk.out/',
    '*.dot',
  ],
  releaseToNpm: true,
  publishToPypi: {
    distName: 'cdk-valheim',
    module: 'cdk_valheim',
  },
  scripts: {
    dia: 'npx cdk-dia --target-path assets/images/diagram.png',
  },
});

project.synth();
