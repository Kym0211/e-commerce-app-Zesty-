"use client"

import { useToast } from "@/hooks/use-toast";
import { useRouter, useParams } from "next/navigation";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import React from "react";
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const VerifyAccount = () => {
    const router = useRouter();
    const params = useParams<{email: string}>();
    const {toast} = useToast();

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            code: "",
        }
    })

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            const response = await axios.post(`/api/verify-otp`, {
                email: params.email,
                otp: data.code,
            });

            toast({
                title: "Success",
                description: response.data.message,
            })

            router.replace("/sign-in");
        } catch (error) {
            console.error("Error in signup of user", error)
            const axiosError = error as AxiosError<ApiResponse>
            console.log("axiosError in signup of user", axiosError)
            toast({
              title: 'Signup failed',
              description: axiosError.response?.data.message || "An error occured",
              variant: "destructive"
            })
        } 
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
              Verify Your Account
            </h1>
            <p className="mb-4">Enter the verification code sent to your email</p>
                </div>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        name="code"
                        control={form.control}
                        render = {({ field }) => (
                            <FormItem>
                                <FormLabel>Verification Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="code" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
                </Form>

            </div>
        </div>
    )
}

export default VerifyAccount;