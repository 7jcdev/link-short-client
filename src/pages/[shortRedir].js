//import { useParams } from 'next/navigation'
import { redirect } from "next/dist/server/api-utils";
import Spinner from "@/components/spinner/Spinner";

export default function redir() {
    return (
        <div>

        <Spinner />

        </div>
    )
}

export async function getServerSideProps({params}){
    const { shortRedir } = params;
    
    let destUrl = "";
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/short/get-public-url/${shortRedir}`)
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
        destUrl = response.data.url ? response.data.url : null
    });

    if(destUrl !== "")
        return {redirect: {destination: destUrl} };

    return {redirect: {destination: "/"} };
}