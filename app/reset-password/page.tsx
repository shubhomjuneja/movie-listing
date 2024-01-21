"use client";

import Input from "@/components/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { passwordRequiredValidation } from "../(auth)/validation/validation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "@/components/Button";
import { useAuth } from "../(auth)/hooks/useAuth";
import Layout from "@/components/Layout";
import { toast } from "sonner";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      password: "",
    },
  });

  const { loading, changePassword } = useAuth(setError);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const packData = { password: data.password, token };
    try {
      await changePassword(packData);
    } catch (error: any) {
      // add sooner toast here
      toast.error(error.message);
    }
  };

  return (
    <Layout>
      <div className="h-screen flex justify-center items-center">
        <div className="w-full md:w-[350px]">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center items-center">
              <h1 className="md:text-[45px] text-white font-[600] text-[48px]">
                New Password
              </h1>
            </div>
            <div className="relative flex flex-col items-end">
              <Input
                placeholder="Password"
                register={register}
                type={showPassword ? "text" : "password"}
                id="password"
                errors={errors}
                validation={passwordRequiredValidation}
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
              <p className="ml-2 mt-2 mb-5 text-xs text-gray-500">
                Your password must be at least 8 characters long and include a
                mix of upper and lower case letters, numbers, and special
                characters.
              </p>
            </div>
            <Button
              type={"submit"}
              label={"Reset Password"}
              variant="primary"
              loading={loading}
            />
          </form>
          <div className="p-3 flex flex-col items-center">
            <span
              onClick={() => router.push("/")}
              className="cursor-pointer text-sm tracking-wide text-center underline"
            >
              Login to your account
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
