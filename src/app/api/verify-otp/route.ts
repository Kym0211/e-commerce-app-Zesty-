import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import redis from "@/lib/redis";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession, User } from "next-auth";
import mongoose from "mongoose";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { email, otp } = await request.json();
        const user = await UserModel.findOne({email});
        console.log(user)
        if(!user){
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {status: 404}
            )
        }
        if(user.isVerified){
            return Response.json(
                {
                    success: false,
                    message: "User already verified"
                },
                {status: 400}
            )
        }
        const storedOTP = await redis.get(email);
        console.log("Stored OTP", storedOTP)
        

        if(!storedOTP){
            return Response.json(
                {
                    success: false,
                    message: "OTP expired"
                },
                {status: 400}
            )
        }

        if (String(storedOTP) !== otp) {
            return Response.json(
                {
                    success: false,
                    message: "Invalid OTP"
                },
                {status: 400}
            )
        }

        user.isVerified = true;
        await user.save();

        await redis.del(email);

        return Response.json(
            {
                success: true,
                message: "User registered successfully"
            },
            {status: 201}
        )

    } catch (error) {
        console.log("Error verifying OTP\n", error)
        return Response.json(
            {
                success: false,
                message: "Error verifying OTP"
            },
            {status: 500} 
        )
        
    }
}