import ProductForm from '@/components/ProductForm';
import Layout from "@/components/Layout";
export default function NewProduct(){
    return(
        <Layout>
             <h1 className='text-blue-900 mb-2 text-xl'><b>New Product</b></h1>
            <ProductForm />
        </Layout>
    
    )
    
}