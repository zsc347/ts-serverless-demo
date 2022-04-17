# TS serverless monospace demo

A Demo project for deploy API with AWS Lambda & AWS API gateway with typescript and npm workspace.

## Requirements

IDE

-   vscode

Plugins

-   eslint
-   prettier
-   shell-format (optional for format shellscript etc...)

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

Tests is configured with in each sub module.
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

## CI

CI is based on github actions.

When push to any branch, `pre-commit` and `test` will be triggered so we can check whether project in in good status.

Reference

-   https://docs.github.com/en/actions

## Deploy to AWS

This section assume you already got an AWS account and know basic usage of AWS.

We use [Serverless](https://www.serverless.com/framework/docs) framework to generate AWS cloudformation template files. Also we can deploy with `sls deploy` during development.

For continuous deployment, we suggest introducing AWS code pipeline.

**Requirements**

```
$ aws --verison

aws-cli/2.5.4 Python/3.9.11 Linux/5.13.0-39-generic exe/x86_64.ubuntu.20 prompt/off


$ sls --version

Framework Core: 3.12.0
Plugin: 6.2.1
SDK: 4.3.2

```

**Infra Prepare**

We assume you already know AWS and AWS IAM and got an authroized account for deploy resources.

Infrastructure resources is located at `.aws/infra.yml`.
You need to deploy it with aws cloudformation.

```
cd .aws
# go to aws console or use aws console tool to deploy `infra.yml` manually
```

**API powered by AWS Lambda and API Gateway**

We introduced [@vendia/serverless-express](https://github.com/vendia/serverless-express) as an adapter layer. So we can start api server at local or deploy to AWS with same code.

To deploy with command line :

```
cd packages/api
sls deploy
```

It will tell API link `https://<your api>.execute-api.ap-northeast-1.amazonaws.com/v1/metadata`, click it.

Congratulations, your api has been successfully deployed.

## Helpful commands

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
