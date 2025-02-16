import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import redis from "@/lib/redis";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { phoneNo,password, otp} = await request.json();
        const storedOTP = await redis.get(`OTP:${phoneNo}`);
        console.log("storedOTP from verifyotp- ", storedOTP)

        if(!storedOTP){
            return Response.json(
                {
                    success: false,
                    message: "OTP expired"
                },
                {status: 400}
            )
        }

        if (storedOTP !== otp) {
            return Response.json(
                {
                    success: false,
                    message: "Invalid OTP"
                },
                {status: 400}
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            phoneNo: phoneNo,
            password: hashedPassword,
        })
        await newUser.save();

        await redis.del(`OTP:${phoneNo}`);

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