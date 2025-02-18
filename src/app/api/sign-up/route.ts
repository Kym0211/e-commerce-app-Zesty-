import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { sendOTP } from "@/helpers/OTP";
import redis from "@/lib/redis";


export async function POST(req: Request){
    await dbConnect()

    try {
        const {name, email, password} = await req.json()
        const existingUserByEmail = await UserModel.findOne({email})

        if(existingUserByEmail) {
            return Response.json({
                success: false,
                message: "User already exist with this email"
            }, {status:400})
        } else {
            const hashedPassword = bcrypt.hashSync(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                name,
                email,
                password: hashedPassword,
            })

            await newUser.save();
        }
        const otp = Math.floor(100000 + Math.random()*900000).toString()

        const emailResponse = await sendOTP(
            email,
            name,
            otp
        )
        const redisDb = redis.setex(email, 60, otp)
        console.log("OTP for email", email, "is", otp)
        if(redisDb instanceof Error){
            return Response.json({
                success: false,
                message: "Error saving OTP"
            },{status:500})
        }

        if(!emailResponse.success){
            return Response.json({
                success: false,
                message: emailResponse.message
            },{status:500})
        }

        return Response.json({
            success: true,
            message: "User registered successfullly. Please verify your email"
        },{status:201})

    } catch (error) {
        console.log("Error registering user\n", error)
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            {
                status: 500
            }
        )
    }
}