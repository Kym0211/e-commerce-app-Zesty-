import { z } from 'zod';

export const signUpSchema = z.object({
    phoneNo: z.string().min(10, {message: "Phone number must be atleast 10 characters"}),
    password: z.string().min(6, {message: "Password must be atleast 6 characters"}),
})