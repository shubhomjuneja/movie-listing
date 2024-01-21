"use client";
import React, {Suspense, useCallback, useEffect, useState} from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import {
  emailValidation,
  nameValidation,
  passwordRequiredValidation,
  passwordValidation,
} from "./validation/validation";
import Layout from "@/components/Layout/index";
import Input from "@/components/Input";
import Button from "@/components/Button/index";
import { useAuth } from "./hooks/useAuth";
import { toast } from "sonner";

enum VARIANTS {
  login = "Login",
  register = "Register",
  reset = "Reset Password",
}

type Variant = VARIANTS.login | VARIANTS.register | VARIANTS.reset;

function Auth() {
  const [variant, setVariant] = useState<Variant>(VARIANTS.login);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const {
    loading,
    register: registerUser,
    signin,
    passwordReset,
    activateUser,
  } = useAuth(setError);

  const changeVariant = useCallback(
    async (variant: Variant) => {
      clearErrors();
      setVariant(variant);
    },
    [clearErrors]
  );

  const isLogin = useCallback(() => {
    return variant === VARIANTS.login;
  }, [variant]);
  const isRegister = useCallback(() => {
    return variant === VARIANTS.register;
  }, [variant]);
  const isReset = useCallback(() => {
    return variant === VARIANTS.reset;
  }, [variant]);

  const confirmEmail = async (token: string) => {
    try {
      const data = await activateUser(token);
      toast.success(data.message);
      setValue("email", data.email);
    } catch (error: any) {
      toast.error(error?.message || "Error");
    }
  };

  useEffect(() => {
    if (token) {
      confirmEmail(token);
    }
  }, [token]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (isRegister()) {
      try {
        const message = await registerUser(data);
        toast.success(message);
      } catch (error: any) {
        toast.error(error?.message || "Error");
      }
    }
    if (isLogin()) {
      await signin(data);
    }
    if (isReset()) {
      try {
        const message = await passwordReset(data);
        toast.success(message);
      } catch (error: any) {
        toast.error(error?.message || "Error");
      }
    }
  };

  return (
    <Layout>
      <div className="h-screen flex justify-center items-center">
        <div className="w-full md:w-[300px]">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center items-center">
              <h1 className="md:text-[64px] text-white font-[600] text-[48px]">
                {(isLogin() && "Sign In") ||
                  (isRegister() && VARIANTS.register) ||
                  (isReset() && "Reset")}
              </h1>
            </div>
            <div className="my-[24px]">
              {isRegister() && (
                <Input
                  placeholder="Name"
                  register={register}
                  id="name"
                  type="text"
                  errors={errors}
                  validation={nameValidation}
                />
              )}
            </div>
            <div className="mb-[24px]">
              <Input
                placeholder="Email"
                register={register}
                id="email"
                type="email"
                errors={errors}
                validation={emailValidation}
              />
            </div>

            {!isReset() && (
              <div className="relative flex flex-col items-end">
                <Input
                  placeholder="Password"
                  register={register}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  errors={errors}
                  validation={
                    isRegister()
                      ? passwordValidation
                      : passwordRequiredValidation
                  }
                />

                <div>
                  {!showPassword ? (
                    <FaEye
                      className="absolute right-2 top-4 cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  ) : (
                    <FaEyeSlash
                      className="absolute right-2 top-4 cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  )}
                </div>

                {isRegister() && (
                  <p className="ml-2 mt-2 text-xs text-gray-500">
                    Your password must be at least 8 characters long and include
                    a mix of upper and lower case letters, numbers, and special
                    characters.
                  </p>
                )}

                <span
                  className="-mr-3 w-max cursor-pointer p-3"
                  onClick={() => changeVariant(VARIANTS.reset)}
                >
                  <span className="text-sm tracking-wide text-blue-600">
                    Forgot password ?
                  </span>
                </span>
              </div>
            )}
            <Button
              type={"submit"}
              label={
                ((isLogin() && VARIANTS.login) ||
                  (isRegister() && VARIANTS.register) ||
                  (isReset() && VARIANTS.reset)) as string
              }
              variant="primary"
              loading={loading}
            />
            <div className="p-3 flex flex-col items-center">
              <span
                onClick={() =>
                  changeVariant(isLogin() ? VARIANTS.register : VARIANTS.login)
                }
                className="cursor-pointer text-sm tracking-wide text-center underline"
              >
                {isLogin() ? "Create new account" : "Login to your account"}
              </span>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

const Page = () => <Suspense><Auth /></Suspense>

export default Page;
