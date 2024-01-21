"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import bcrypt from 'bcryptjs'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Mnemonic } from "@/Store/ZuStore/Mneumonic"
import axios from "axios"
import toast from "react-hot-toast"
import { useState } from "react"
import { set } from "firebase/database"


const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 5 characters.",
    }),
    confirmPassword: z.string().min(2, {
        message: "Password must be at least 5 characters.",
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
});


function SignUpForm() {

    const [disabled, setdisabled] = useState(false)
    // ...
    // Use the store
    const generateMnemonic = Mnemonic((state) => state.generateMnemonic);
    //   get the mnemonic from store
    const mnemonic = Mnemonic((state) => state.mnemonic);



    // Use the function in an event handler or effect
    const handleClick = async () => {
        generateMnemonic();
    };







    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: ""
        },
    })

    // loading state

    const { isLoading, isSubmitting, errors } = form.formState






    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        //   destructure the values
        const { username, password, confirmPassword } = values

        console.log(username, password, confirmPassword);
        // hash password
        const hashed_password = bcrypt.hashSync(password, 12)



        // handleclick
        if (mnemonic == "") {
            await handleClick();

        }
        const MnemonicComb = mnemonic.toString()
        console.log(MnemonicComb);


        //  I have to get the mnemonic from the store
        // make apost request to the server
        const createAccountResponse = await axios.post("http://localhost:3000/api/CreateAccount2", {
            username,
            MnemonicComb
        })
        console.log(createAccountResponse);
        if (createAccountResponse.status !== 200) {
            // set error message in for reacthookform
            form.setError("username", {
                type: "manual",
                message: "username already exist"
            })
            toast.error("username already exist")
        }
        //  post data in the database
        // const { public_key, secret_key, paymail, username, hashed_password } = body;

        // post data in the database
        console.log("createAccountResponse", createAccountResponse.data.code);
        console.log("createAccountResponse data", createAccountResponse.data.data);

        if(createAccountResponse.data.data &&  createAccountResponse.data.data.includes("createAccountAlreadyExist") ){
           
            // relaod to reset the store and cookies
            console.log("createAccountResponse already includes", createAccountResponse.data.code); 
            window.location.reload()
        }
        



        // const { public_key, secret_key, paymail, username, hashed_password } = body;
        if (createAccountResponse.data.code === 201) {
            const { public_key, secret_key, paymail } = createAccountResponse.data.data;
            if (public_key === "" || secret_key === "" || paymail === "") {
                toast.error("something went wrong")
            }

            const ResponsePostedInFireBase = await axios.post("http://localhost:3000/api/PostUserDataToFireBase", {
                public_key,
                secret_key,
                paymail,
                username,
                hashed_password
            })
            console.log("ResponsePOstedIn Firebase ", ResponsePostedInFireBase);
        }
    }
    return (
        <div className=" flex justify-center items-center w-full no-scrollbar md:mt-5 ">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 max-w-md  md:w-full ">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className=" ">
                                <FormLabel>Username</FormLabel>
                                <FormControl className=" ">
                                    <Input placeholder="username" {...field} className=" dark:rounded-xl rounded-xl" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} className=" dark:rounded-xl rounded-xl" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ConfirmPassword</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} className=" dark:rounded-xl rounded-xl" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <span className=" w-full  justify-end flex">
                        <Button disabled={isLoading} type="submit">Submit</Button>
                    </span>

                </form>
            </Form>

        </div>

    )
}


export default SignUpForm
