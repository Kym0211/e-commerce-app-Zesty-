"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Logo } from "@/components/logo";

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error in signup of user", error);
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Signup failed",
        description: axiosError.response?.data.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      toast({
        title: "Google Sign-Up Failed",
        description: "An error occurred while signing up with Google.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0F172A] to-[#1E293B] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-cyan-500/10 transition-all"
      >
        {/* Enhanced Logo */}
        <div className="w-80 mb-2 flex items-center justify-center">
          <Logo />
        </div>

        {/* Google Sign-Up Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleGoogleSignUp}
            className="w-full bg-gradient-to-r from-slate-700/50 to-slate-800/50 hover:from-slate-600/50 hover:to-slate-700/50 border border-cyan-400/20 text-cyan-200 rounded-xl h-12 font-semibold space-x-2 transition-all"
          >
            <svg viewBox="0 0 48 48" className="h-5 w-5">
              <path fill="#fff" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#EA4335" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#4285F4" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="#FBBC05" d="M24 9.5c3.48 0 6.54 1.2 8.97 3.35l6.74-6.74C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            </svg>
            <span>Continue with Google</span>
          </Button>
        </motion.div>

        <div className="my-8 flex items-center">
          <div className="flex-grow border-t border-cyan-400/20"></div>
          <span className="mx-4 text-cyan-300/80 text-sm">or sign up with email</span>
          <div className="flex-grow border-t border-cyan-400/20"></div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-cyan-200/90">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-slate-800/50 border border-cyan-400/20 focus:border-cyan-400/40 rounded-xl h-12 text-cyan-100 focus-visible:ring-0"
                      placeholder="Alex Turner"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400/90" />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-cyan-200/90">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-slate-800/50 border border-cyan-400/20 focus:border-cyan-400/40 rounded-xl h-12 text-cyan-100 focus-visible:ring-0"
                      placeholder="alex@example.com"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400/90" />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-cyan-200/90">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      className="bg-slate-800/50 border border-cyan-400/20 focus:border-cyan-400/40 rounded-xl h-12 text-cyan-100 focus-visible:ring-0"
                      placeholder="••••••••"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400/90" />
                </FormItem>
              )}
            />

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white rounded-xl h-12 font-semibold text-lg transition-all"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin text-cyan-100" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </motion.div>

            <p className="text-center text-sm text-cyan-300/80 mt-6">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-cyan-400 hover:text-cyan-300 font-semibold underline-offset-4 hover:underline transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </form>
        </Form>
      </motion.div>
    </div>
  );
};

export default Page;
