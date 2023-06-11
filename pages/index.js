import Layout from "../components/Layout";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home(){
    const {data:session} =useSession();

    return(
    <Layout>
        <div className="text-blue-900 flex justify-between">
            <h3>Hello , <b>{session?.user?.name}</b></h3>
            
            <div className="flex bg-grey-300 text-back gap-1 rounded-lg overflow-hidden" >
                <img src={session?.user?.image} alt="LoggedInUserImage" className="w-6 h-6 " />
                <span className="px-2">{session?.user?.name}</span>
            </div>
        </div>
    </Layout>
    );
}