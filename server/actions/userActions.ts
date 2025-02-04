"use server";

import connectDB from "@/lib/db";
import { User } from "../models/userModel";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { signIn, signOut } from "@/auth";

//Login user

const loginUser = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const res = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });

    if (res?.error) {
      return { error: res.error }; // Ensure a plain object is returned
    }

    return { success: true };
  } catch (error) {
    return { error: "Login failed" }; // Ensure error handling returns a plain object
  }
};


//Register User
const registerUser = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hash(password, 10);

  await User.create({ name, email, password: hashedPassword });

  console.log(`Welcome ${name}`);

  redirect("/home/tasks");
};

const logoutUser = async () => {
  await signOut();
  return { success: true }; // Ensure a plain object is returned
};


export { registerUser, loginUser, logoutUser };
