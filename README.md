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

```
npm run watch
```

`npm run watch` is also configured as a vscode task. You can also use short key `ctrl+p` open command panel, then `> Run task` and select task `npm: watch`.

Local bootstrap is under `packages/api` module.

```
cd packages/api
npm run start
cd -
```

then open `http://localhost:3000/v1/metadata`.

API should be avavalible.

## Test

Test config is under each sub module.
Currently only service modules configured tests with jest(ts-jest).

```
cd packages/service
npm run test
cd -
```

Then tests under `__tests__` folder will run and generate reports.

Reference

-   https://jestjs.io/docs/configuration
-   https://github.com/mtiller/ts-jest-sample

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
