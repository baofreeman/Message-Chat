"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/input/Input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingModal from "@/app/components/LoadingModal";

type Variant = "REGISTER" | "LOGIN";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toggleVariant = useCallback(() => {
    variant === "LOGIN" ? setVariant("REGISTER") : setVariant("LOGIN");
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.status === "authenticated") {
      setIsLoading(true);
      router.push("/users");
    }
  }, [session?.status, router]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (res?.ok) {
        const userData = await res.json();
        toast.success(`${userData?.name} is created success`);
        await signIn("credentials", data);
        router.push("/users");
      } else {
        toast.error(`${res.statusText}`);
      }
      setIsLoading(false);
    }

    if (variant === "LOGIN") {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (res?.ok) toast.success("Success");
      if (res?.error) toast.error(res.error);
      setIsLoading(false);
    }
  };

  const socialAction = async (action: string) => {
    setIsLoading(false);
    // NextAuth
    const res = await signIn(action, { redirect: false });
    if (res?.ok) toast.success("Success");
    if (res?.error) toast.error(res.error);
  };

  return (
    <>
      {isLoading && <LoadingModal />}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-bgModal px-4 py-8 shadow shadow-bgTertiary sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {variant === "REGISTER" && (
              <Input
                label="Name"
                id="name"
                register={register}
                errors={errors}
                disabled={isLoading}
              />
            )}
            <Input
              label="Email address"
              id="email"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
            <Input
              label="Password"
              id="password"
              type="password"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
            <div>
              <Button fullWidth secondary disabled={isLoading}>
                {variant === "LOGIN" ? "Sign in" : "Register"}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-bgTertiary" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-bgModal px-2 text-textSecondary text-sm">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <AuthSocialButton
                icon={BsGithub}
                onClick={() => socialAction("github")}
              />
              <AuthSocialButton
                icon={BsGoogle}
                onClick={() => socialAction("google")}
              />
            </div>

            <div className="flex gap-2 justify-center mt-6 px-2 text-textSecondary text-sm">
              <div>
                {variant === "LOGIN"
                  ? "New to Message"
                  : "Already have an account?"}
              </div>
              <div
                className="underline cursor-pointer text-active"
                onClick={toggleVariant}
              >
                {variant === "LOGIN" ? "Create an account" : "Login"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
