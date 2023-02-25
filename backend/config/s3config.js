const aws = require('aws-sdk');

const s3=new aws.S3(
{
    accessKeyId:process.env.S3_ACCESS_KEY,
    secretAccessKey:process.env.S3_SECRET,
    region :process.env.S3_REGION
}
)

//export default {s3}

module.exports= s3;