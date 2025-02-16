import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request){
    await dbConnect()

    try {
        const {phoneNo, password} = await req.json()
        const existingUserByPhoneNo = await UserModel.findOne({
            phoneNo,
        })

        if(existingUserByPhoneNo) {
            return Response.json({
                success: false,
                message: "User already exist with this number"
            }, {status:400})
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new UserModel({
            phoneNo: phoneNo,
            password: hashedPassword,
        })

        console.log(newUser)
        await newUser.save();

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