import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";

export default function DeleteProduction(){
            const router = useRouter();
            const [productInfo,setProductInfo]=useState();
            const{id}=router.query;
            useEffect(()=>{
                if(!id){
                    return
                }
            axios.get('/api/products?id='+id).then(response=>{ //Fetching from moongose
                setProductInfo(response.data);
            });},[id]);

            //Donot want to Delete
            function goBack(){
                router.push('/products');
            }

            //delete Product
            async function deleteProduct(){
               await  axios.delete('/api/products?id='+id);
               goBack();
            }
    return(
        <Layout>
             <h1 className="text-center">Do you really Want to delete this Product ({productInfo?.title}) ?</h1>

             <div className="flex gap-2 justify-center">
             <button className="btn-red" onClick={deleteProduct}>Yes</button>
             <button onClick={goBack} 
                className="btn-default">
                No</button>
             </div>
        
             
        </Layout>
    )
}