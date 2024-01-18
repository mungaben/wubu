"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

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
    // ...
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        //   destructure the values
        const { username, password, confirmPassword } = values

        console.log(username, password, confirmPassword);
        

        //   make a request to your API



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
                        <Button type="submit">Submit</Button>
                    </span>

                </form>
            </Form>

        </div>

    )
}


export default SignUpForm
