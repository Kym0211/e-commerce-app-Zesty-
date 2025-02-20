import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

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
            console.log("Credentials", credentials)
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
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "google") {
        const dbUser = await UserModel.findOne({ email: token.email }) as { _id: string, name: string, addresses: any[], cart: any[] };
        if (dbUser) {
          token._id = dbUser._id.toString();
          token.name = dbUser.name;
          token.addresses = dbUser.addresses;
          token.cart = dbUser.cart;
        }
      } else if (user) {
        token._id = user._id?.toString();
        token.name = user.name;
        token.addresses = user.addresses;
        token.cart = user.cart;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      if(token) {
          session.user = {
              _id: token._id,
              name: token.name,
              addresses: token.addresses,
              cart: token.cart
          };
      }
      return session;
  },
    async signIn({ user, account }) {
      await dbConnect();
      if (account?.provider === "google") {
        try {
          // Use upsert to create or update the user in one step
          const existingUser = await UserModel.findOneAndUpdate(
            { email: user.email },
            {
              $set: { 
                name: user.name, 
                isGoogleAuth: true, 
                isVerified: true 
              }
            },
            { new: true, upsert: true } // Return updated document and create if it doesn’t exist
          );

          return true;

        } catch (error) {
          console.log("Error saving Google user:", error);
          return false;
        }
      }
      return true;
    }
    
    },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
});