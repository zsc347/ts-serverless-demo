# TS serverless demo

ON THE WAY ...

A Demo project for build AWS Lambda server with typescript and npm workspace.

## Requirements

IDE

-   vscode

Plugins

-   eslint
-   prettier
-   shell-format

Dependency

```
npm >= 8.x
node >= 14.x
```

## Prepare environment

Intall dependency.

```
npm install
```

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
Open any ts file and with short key `F5`, the ts file will run in debug mode.

Reference

-   https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_load-environment-variables-from-external-file-node
-   https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_launch-configuration

Launch configuration is `.vscode/launch.json`

## Logging

Logging is configured with [log4js](https://github.com/log4js-node/log4js-node) which provide a unified interface for logging and
[source-map-support](https://github.com/evanw/node-source-map-support#readme) which show correct ts file position rather than nonsense js position of compiled file.

## Git Hooks

Hooks is configured using [husky](https://typicode.github.io/husky/#/?id=install).

When ever developer trying to commit, `npm run pre-commit` will run so code style and lint rules can be guaranteed.

Reference

-   https://typicode.github.io/husky
-   https://blog.thoughtspile.tech/2021/06/14/faster-pre-commit/
-   https://prettier.io/docs/en/precommit.html

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
