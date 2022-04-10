# Project AWS Infrastructure Prepare

To support project running. Some common resources must be prepared.

For ts serverless demo, we need resources such as deployment bucket, execution role, etc...

We assure youknow about [AWS IAM](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html), and already got an accout which is able to deploy resources with AWS cloudformation.

`infra.yml` defines such resources. It need to be deployed before tring to deploy project to AWS.

For uses with iam privilege, you can upload `infra.yml` as cloudformation template and then deploy it. After that, all resources for ts serverless demo will be ready to use.

`modules.csv` tells the deploy order for other ts serverless modules.
