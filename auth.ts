import NextAuth, { CredentialsSignin } from "next-auth";
import credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import connectDB from "./lib/db";
import { User } from "./server/models/userModel";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true, // ✅ Trust localhost or any custom host
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
    }),
    credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Please provide email & password");
        }

        await connectDB();
        const user = await User.findOne({ email }).select("+password +role");

        if (!user) {
          throw new CredentialsSignin("Invalid email or password");
        }

        if (!user.password) {
          throw new Error("Please provide password");
        }

        const isValidPassword = await compare(password, user.password);
        if (!isValidPassword) {
          throw new Error("Incorrect Password");
        }

        return {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user._id,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
