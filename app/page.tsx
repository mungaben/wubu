import Image from "next/image";
import { ApiResponse,Challange, SignInchallange } from "@/Utils/CreateBenkikoAccount";
import Welcome from "./Homepage/Welcome";
export default async function Home() {



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <Welcome/>
    </main>
  );
}
