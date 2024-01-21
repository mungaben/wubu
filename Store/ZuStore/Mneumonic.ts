


// store genrated mnemonic 

import { generateMnemonic } from "@/Utils/Accounts/Generatemnemonic";
import { log } from "console";
import { create } from "zustand";



type Mnemonic={
    mnemonic:string;
    mnemonicGenerated:boolean;
    generateMnemonic:()=>void;
    
    deleteMnemonic:()=>void;

}

export const Mnemonic=create<Mnemonic>((set)=>({
    mnemonic:"",
    mnemonicGenerated:false,
    generateMnemonic:async()=>{
        const mnemonic=await generateMnemonic();
        console.log("mnemonic",mnemonic);
        
        set((state)=>({mnemonic,mnemonicGenerated:true}))
    },

    
  
    deleteMnemonic:()=>set((state)=>({mnemonic:"",mnemonicGenerated:false})),
}))



