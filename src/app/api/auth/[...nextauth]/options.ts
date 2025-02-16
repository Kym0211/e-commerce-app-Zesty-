import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import axios from "axios";

export const authOptions: NextAuthOptions = ({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
        }
      }
    }),
    CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
            identifier: { label: "email", type: "text" },
            password: { label: "password", type: "password" }
        },
        async authorize(credentials: any): Promise<any> {
            await dbConnect()
            try {
                const user = await UserModel.findOne({ email: credentials.identifier })

                if (!user) {
                    throw new Error("Please verify your account before login")
                }

                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                if (!isPasswordCorrect) {
                    throw new Error("Incorrect password")
                }

                return user
            } catch (error: any) {
                throw new Error(error.message)
            }
        }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {

    async jwt({ token, user }: { token: any, user: any }) {
        if(user) {
            token._id = user._id?.toString();
        }
        return token
    },
    async session({ session, token }: { session: any, token: any }) {
        if(token) {
            session.user._id = token._id;
        }
        return session;
    },
    async signIn({ user, account }) {
        if (account?.provider === "google") {
          try {
            await axios.post(`${process.env.NEXTAUTH_URL}/api/sign-up`, {
              name: user.name,
              email: user.email,
              password: ""
            });
            // console.log(user);
          } catch (error) {
            console.error("Error saving Google user:", error);
            return false; // Reject login if saving fails
          }
        }
        return true;
      },
    },
  pages: {
    signIn: "/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,
});