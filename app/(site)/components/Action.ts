"use server";
import { signIn } from "next-auth/react";

export const registerCredential = async (data: any) => {
  try {
    await fetch("/api/register", {
      method: "POST",
      body: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const signInAction = async () => {
  try {
    await signIn("github");
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") {
      throw error;
    }
    return error.message;
  }
};
