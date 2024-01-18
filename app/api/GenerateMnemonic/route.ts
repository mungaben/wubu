import { generateMnemonic } from "@/Utils/Accounts/Generatemnemonic";
import { NextRequest, NextResponse } from "next/server";





export default async function GET(req:NextRequest,res:NextResponse){
    const mnemonic=await generateMnemonic();

    if(!mnemonic){
        return NextResponse.json({
            status:"error",
            data:{
                error:"mnemonic not generated"
            },
            message:"mnemonic not generated"
        })
    }

    return NextResponse.json({
        status:"success",
        data:{
            mnemonic:mnemonic
        },
        message:"mnemonic generated"
    })



}