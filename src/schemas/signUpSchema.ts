import { z } from 'zod';

export const signUpSchema = z.object({
    name: z.string().min(2, {message: "Name must be atleast 2 characters"}),
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "Password must be atleast 6 characters"}),
})