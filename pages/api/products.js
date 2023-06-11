import mongoose from 'mongoose';
import { Product } from '@/models/Product';
import {mongooseConnect} from '@/lib/mongoose';
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
    const {method}=req;
    await mongooseConnect();
    await isAdminRequest(req,res);
  

  if(method === 'GET'){
    if(req.query?.id){
      res.json(await Product.findOne({_id:req.query.id}));
    }
    else{
      res.json(await Product.find());
    }
  }
    if(method === 'POST'){
    const {title,description,price,images,category,properties} = req.body;
     const productDoc = await Product.create({
        title,description,price,images,category,properties
      })
        res.json(productDoc);
    }

    if(method==='PUT'){
      const {title,description,price,images,_id,category,properties} = req.body;
       // console.log({images});
    // console.log({title,description})//--> To check what is saving init
     await Product.updateOne({_id},{title,description,price,images,category,properties});
     // same meanning -->  _id:id ..title:title , desc:desc --> Vo variable name same hai isllia simple assa likha
     res.json(true);
    }

    if(method==='DELETE'){
      if(req.query?.id){
        await Product.deleteOne({_id:req.query?.id});
        res.json(true);
      }
    }
  }
   