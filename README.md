# TS serverless demo

ON THE WAY ...

A Demo project for build AWS Lambda server with typescript and npm workspace.

## Requirements

IDE

-   vscode

Plugins

-   eslint
-   prettier

Dependency

```
npm >= 8
node >= 14
```

## Prepare environment

Intall dependency.

```
npm install
```

Monitor files change and copmpile just in time.

## Bootstrap

Watch files change and starging incremental compilation.

```
npm run watch
```

`npm run watch` is also configured as a vscode task.
With short key `ctrl+p` open command panel, then use command `> Run task` and select task `npm: watch`.

Local bootstrap is under `packages/api` module.

```
cd packages/api
npm run start
cd -
```

Open `http://localhost:3000/v1/metadata`.

API should be avavalible.

## Test

Tests is confifured for each sub module.
Currently only `service` module configured tests with jest(ts-jest).

```
cd packages/service
npm run test
cd -
```

Then tests under `__tests__` folder will run and generate reports.

Reference

-   https://jestjs.io/docs/configuration
-   https://github.com/mtiller/ts-jest-sample

## Typescript Debugging

This project use vscode built-in debugging support for launch and debugging.

After start task `npm run watch` or run vscode task `> Run Task > npm: watch`,
Open any ts file and with short key `F5`, the ts file will run with debug mode.

Reference

-   https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_load-environment-variables-from-external-file-node
-   https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_launch-configuration

The configuration file is under `.vscode/launch.json`

## Useful commands

Build so types can be referenced

```
npm run build
```

Unify code format with prettier

```
npm run format
```

Force code convention with eslint

```
npm run lint
```
