import cdk = require("@aws-cdk/core");
import s3 = require("@aws-cdk/aws-s3");
import s3deploy = require("@aws-cdk/aws-s3-deployment");

export class CdkStorageExampleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const prodevBucket = new s3.Bucket(this, "prodev2019", {
      bucketName: "prodev2019",
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "error.htlm",
      // versioned: true, // If bucket has versions
      publicReadAccess: true, // It's necessary to public bucket to publish the static web site

      metrics: [
        {
          id: "EntireBucket" // It's use CloudWatch to monitoring the service
        }
      ]
    });

    // Deploy site contents to S3 bucket
    new s3deploy.BucketDeployment(this, "DeployWithInvalidation", {
      sources: [s3deploy.Source.asset("./site-contents")],
      destinationBucket: prodevBucket
    });
  }
}
