import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { sendOTP } from "@/helpers/OTP";

export async function POST(req: Request){
    console.log("request body", req.body)

    return Response.json({
        success: true,
        message: "User registered successfullly. Please verify your email"
    },{status:201})
}