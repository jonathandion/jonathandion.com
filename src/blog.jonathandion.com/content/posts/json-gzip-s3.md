+++
author = "Jonathan Dion"
date = 2019-04-23
title = "gzip json to aws s3 using nodejs"
series = "aws"
+++

today I learned, how to upload a json file to s3 with gzip compression using nodejs.

I thought would be a great idea to share a sample:

```js
const zlib = require('zlib')
const util = require('util')

const AWS = require('aws-sdk')
const s3 = new AWS.S3();

const gzip = util.promisify(zlib.gzip)

async function main() {
  try {
    const data = JSON.stringify({ name: "somedata" })
    const buffer = new Buffer.from(data)
    const compressed = await gzip(buffer)

    const params = {
      Body: compressed,
      Bucket: "my-bucket-here",
      Key: "my-data.json.gz",
      ContentType: 'application/json',
      ContentEncoding: "gzip",
    };

    await s3.putObject(params).promise()
  } catch(e) {
    console.log(e);
  }
}

main()
```
