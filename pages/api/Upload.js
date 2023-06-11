import multiparty from 'multiparty';
import fs from 'fs';
import { PutObjectCommand,S3Client } from '@aws-sdk/client-s3';
import mime from 'mime-types';
import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";
const bucketName = 'ecommerce-nextjs-project';

export default async function handle(req,res){
    await mongooseConnect();
    await isAdminRequest(req,res);

    const form = new multiparty.Form();
  const {fields,files} = await new Promise((resolve,reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({fields,files});
    });
  });
// console.log('length:',files); // --> Have the Information of the file --> Path of the The Uploaded Image
console.log('length:',files.file.length) // --> length of file return (return 1)

const client = new S3Client({
region:'us-east-1', //Bucket Region
credentials:{
    accessKeyId:process.env.S3_ACCESS_KEY,
    secretAccessKey:process.env.S3_SECRET_ACCESS_KEY,
}
});     
const links =[];
for(const file of files.file){
    const ext = file.originalFilename.split('.').pop();
    // console.log({ext,file}); --> jpeg ==>extn of file
    const newFilename = Date.now()+'.'+ext;
    
    //Cleint is Ready now we cab use it;
    await client.send(new PutObjectCommand({
    Bucket:bucketName, //--> Bucket Name on Cloud console
    Key:newFilename,
    Body:fs.readFileSync(file.path),
    ACL:'public-read', //-> So that File wille be publicly available 
    ContentType:mime.lookup(file.path),
    }));
    const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
    links.push(link);
}
// console.log(fields);
    // return res.json('Image Uploaded Successfully'); 
    return res.json({links}); 
}   

export const config ={

    api:{bodyParser:false}, //--> data in our request not parse our req to json 
};