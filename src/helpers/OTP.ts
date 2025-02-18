import { resend } from "../lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendOTP(email: string, firstName:string, otp: string): Promise<ApiResponse> {
    try {
        console.log("Sending verification email to", email, "with OTP", otp)
        const send = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: " E-commerce Verification Code",
            react: VerificationEmail({firstName, otp})
        })
        console.log("Email sent successfully", send)
        return {
            success: true,
            message: "Verification email send successfully",
            split: (arg0: string) => { return null; }
        }
    } catch (emailError) {
        console.error("Error sending verification email", emailError)
        return {
            success: false,
            message: "Failed to send verification email",
            split: (arg0: string) => { return null; }
        }
    }
}


