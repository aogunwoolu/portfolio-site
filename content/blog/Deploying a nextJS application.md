---
title: Deploying A NextJS Application Using A Lambda
description: Using an aws lambda to deploy a NextJS application with cloudfront routing between static (s3) and dynamic (λ) content. This was an exploration of the aws provided CDN
src: https://i.imgur.com/qVsahwd.png
author: Abisade Ogunwoolu
slug: lambda-cloudfront-site-host
date: 2024-06-29
tags:
  - NextJS
  - Lambda
  - cloudfront
---

# Overview

Taking advantage of Next.js 14+ for building dynamic and performant React applications, I decided to host my project serverlessly using AWS. This journey involved leveraging AWS Lambda, S3, and CloudFront to create a scalable and efficient deployment. Here’s how I navigated through this process using Terraform.

# Getting Started with Next.js Standalone Mode

Next.js offers a “standalone” mode that simplifies the deployment of serverless functions. This mode outputs only the necessary files for running the application into the `.next/standalone/` directory, excluding static assets like images and stylesheets. This approach ensures a lean deployment, perfect for AWS Lambda.

# Step 1: Storing Static Assets in S3

## Organizing Static Assets

My project had static assets in two primary locations:

- `.next/static/`
- `public/`

The `.next/static/` directory includes compiled frontend assets, while the `public/` directory contains assets intended to be served from the root. To avoid conflicts and ensure efficient asset delivery, I decided to move all static assets to S3.

## Uploading to S3

I structured my S3 bucket to use commit hashes for versioning, which looks like this:

- `/assets/[commit-hash]/_next/static`
- `/assets/[commit-hash]/public`

This structure allowed me to:

- Keep a consistent URL prefix for CDN rules.
- Manage multiple versions simultaneously.
- Easily clean up old versions.

Using AWS CLI, I uploaded these directories to S3 after each build, ensuring that the assets were always up-to-date.

```bash
aws s3 cp .next/static/ s3://my-bucket/assets/[commit-hash]/_next/static --recursive
aws s3 cp public/ s3://my-bucket/assets/[commit-hash]/public --recursive
```

# Step 2: Setting Up Next.js on AWS Lambda

## Preparing AWS Lambda for Next.js

To deploy a Next.js application on AWS Lambda, managing AWS events and HTTP requests is crucial. The AWS Lambda Web Adapter (LWA) facilitates this process by converting AWS events into HTTP requests and responses, ensuring smooth communication between the serverless function and the web client.

## Steps for Deployment

### 1. Prepare the Standalone Directory

First, we need to prepare the standalone build of our Next.js application for deployment:

- **Build the Application**: Ensure your Next.js application is built using `next build`.
- **Locate the Standalone Directory**: After building, navigate to the `.next/standalone/` directory.
- **Compress the Directory**: ZIP the entire `.next/standalone/` directory. This ZIP file will be uploaded to AWS Lambda.

```bash
cd .next/standalone/
zip -r standalone.zip .
```

### 2. Configure the Lambda Function with Terraform

With the standalone directory prepared, we can set up the Lambda function using Terraform:

- **Terraform Configuration**: Below is the Terraform configuration to set up the Lambda function, upload the ZIP file, and configure the environment variables.

```hcl
provider "aws" {
  region = "us-west-2"
}

resource "aws_s3_bucket" "lambda_bucket" {
  bucket = "my-lambda-bucket"
}

resource "aws_s3_bucket_object" "lambda_zip" {
  bucket = aws_s3_bucket.lambda_bucket.bucket
  key    = "standalone.zip"
  source = "path/to/standalone.zip"
}

resource "aws_iam_role" "lambda_role" {
  name = "lambda_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Sid    = "",
        Principal = {
          Service = "lambda.amazonaws.com"
        },
      },
    ],
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function" "next_js" {
  function_name    = "NextJsServerlessApp"
  s3_bucket        = aws_s3_bucket.lambda_bucket.bucket
  s3_key           = aws_s3_bucket_object.lambda_zip.key
  handler          = "standalone-launch.handler"
  runtime          = "nodejs18.x"
  memory_size      = 1024
  timeout          = 900
  role             = aws_iam_role.lambda_role.arn
  environment {
    variables = {
      AWS_LAMBDA_EXEC_WRAPPER = "/opt/bootstrap"
      PORT                    = "8080"
      AWS_LWA_PORT            = "8080"
      RUST_LOG                = "info"
    }
  }
}
```

## 3. Deploy the Lambda Function

- **Run Terraform**:
  - Initialize Terraform and apply the configuration.

```bash
terraform init
terraform apply
```

### 4. Test the Lambda Function

- **Invoke the Function**:
  - Copy the function URL provided by AWS Lambda.
  - Open a web browser or use a tool like `curl` to test the function.

```bash
curl https://your-lambda-url.amazonaws.com
```

# Step 3: Setting Up CloudFront for Caching and Routing

##CloudFront Distribution

CloudFront played a crucial role in routing requests and caching content close to users. I set up a CloudFront distribution with multiple origins:

1. **Next.js Lambda Function URL**
2. **S3 Bucket for Static Assets**
3. **S3 Bucket for Public Directory Assets**

## Configuring Cache Behaviors

Cache behaviors defined how CloudFront handled different requests:

- **Static Assets:** Routed `/assets/*` requests to the S3 bucket with appropriate caching.
- **Public Directory Assets:** Directed specific paths to the public directory origin.
- **Dynamic Requests:** Default behavior routed to the Next.js server with no caching to ensure real-time content updates.

## Configuring CloudFront with Terraform

Below is the Terraform configuration to set up the CloudFront distribution:

```hcl
resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name = aws_lambda_function.next_js.invoke_arn
    origin_id   = "nextjs_lambda"
  }

  origin {
    domain_name = "${aws_s3_bucket.lambda_bucket.bucket}.s3.amazonaws.com"
    origin_id   = "s3_bucket"
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Next.js CDN"
  default_root_object = "index.html"

  aliases = ["www.mywebsite.com"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "nextjs_lambda"
    forwarded_values {
      query_string = true
      cookies {
        forward = "none"
      }
    }
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_All"
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = "arn:aws:acm:us-west-2:123456789012:certificate/your-certificate-id"
    ssl_support_method  = "sni-only"
  }
}
```

## Setting Up DNS

Finally, I configured DNS settings to point my domain to the CloudFront distribution, ensuring that users accessing my site would be routed through CloudFront, benefiting from its caching and routing capabilities.

```hcl
resource "aws_route53_record" "cdn_record" {
  zone_id = "your_zone_id"
  name    = "www"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.cdn.domain_name
    zone_id                = aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = false
  }
}
```

# Conclusion

By following these steps, my serverless Next.js application was up and running on AWS, with optimal performance and efficient resource management. This setup not only optimized performance but also simplified the management of my application in the cloud. Using Terraform made the process of setting up and managing the infrastructure much more streamlined and reproducible.

