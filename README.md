# 简介, Introduction
这个项目是用 Node，运行 AWS SDK 连接 AWS DynamoDB 的测试项目。  
This project is a test application built with Node.js, utilizing the AWS SDK to connect to AWS DynamoDB.

# 参考资料, References

## 本项目用到的参考, Resources used in this project
GitHub 上可参考代码  
You can find reference code on GitHub  
[DynamoDB code examples for the SDK for JavaScript (v3)](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/dynamodb#code-examples)

DynamoDB 官方文档，包含下面 APIReference  
DynamoDB official documentation, including the API Reference  
[Amazon DynamoDB Documentation](https://docs.aws.amazon.com/dynamodb/)

APIReference  
[Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Operations_Amazon_DynamoDB.html)

## SDK for JS 资源, SDK for JavaScript resources

SDK for JS 官方 GitHub  
Official GitHub repository for the SDK for JavaScript  
[AWS SDK for JavaScript v3](https://github.com/aws/aws-sdk-js-v3#getting-started)

GitHub 上全部 JS 例子代码  
All JavaScript example codes on GitHub  
[AWS SDK for JavaScript (v3) code examples](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3)

AWS SDK for JavaScript, Version 3, SDK 官方文档  
Official documentation for AWS SDK for JavaScript, Version 3  
[AWS SDK for JavaScript Documentation](https://docs.aws.amazon.com/sdk-for-javascript/)

AWS SDK for JavaScript v3 Node.JS 包的文档  
Documentation for AWS SDK for JavaScript v3 Node.js package  
[@aws-sdk/client-dynamodb](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-dynamodb/x`)

# 开发步骤，Development Steps

## 涉及到的包，Packages Involved
Node.js, 20.14.0  
@aws-sdk/client-dynamodb  
dotenv

## Win 11 开发环境设置，Setting Up Development Environment on Windows 11

#### nvm 环境切换，Switching Node.js Versions with nvm
```bash
nvm list available
nvm uninstall 20.11.1
nvm install 20.14.0
nvm use 20.14.0
```

#### 重新全局安装 yarn，Reinstalling Yarn globally
```bash
npm install --global yarn
yarn --version
```

#### 项目建立和包安装，Project setup and package installation
```bash
yarn init

yarn add dotenv
yarn add @aws-sdk/client-dynamodb
```

#### package.json 中加入，Add to package.json
```
"type": "module",
```

## 代码文件说明，Explanation of Code Files
- list-table.js  
列出 Dynamodb 上所有的表  
List all tables on DynamoDB

- batch-write-item.js  
读取 json 文件中的所有数据，并插入数据库中  
Read all data from a JSON file and insert into the database

- batch-get.js  
注意：必须在 key 中有 partition key 和 sort key  
Note: There must be partition key and sort key in the key

- get-item.js  
注意，官方例子的 key 是错的，是对象，不是数组  
Note, the keys in the official example are incorrect; they are objects, not arrays.

- query.js  
The condition must perform an equality test on a single partition key value.  
必须要指定 partition key  
A partition key must be specified.

- scan.js  
整表扫描，简化到，可以只有 TableName  
Full table scan, simplified to only TableName in the query API

- scan-ethan-timeline.js  
对 scan 出来的结果用 js 代码排序  
Sort the results obtained from a scan using JavaScript code.

## Git
```bash
git init
git add -A
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/tallblacks/aws-dynamodb.git
git push -u origin main
```