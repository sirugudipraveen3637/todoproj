const s3=require('../config/s3config.js')
//import {s3} from "../config/s3config.js"
const s3fileupload=async({bucket,key,body,contenttype})=>
{

   return await s3.upload({
    Bucket:bucket,
    Key:key,
    Body:body,
    ContentType:contenttype
   }).promise();
}

/*export const s3filedelete=async({bucket,key})=>
{

   return await s3.deleteObject({
    Bucket:bucket,
    Key:key
   }).promise();
}*/

//export default {s3fileupload}
module.exports= s3fileupload;