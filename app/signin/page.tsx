"use client";
import React, { useEffect, useState } from "react";
import { login } from "../../services/login";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Layout from "@/components/Layout/index";
import Input from "@/components/Input/index";
import Button from "@/components/Button/index";
import PrivateRoute from "@/components/ProtectedRoute/index";
import { signIn, useSession } from "next-auth/react";

type Props = {};

function Signin({}: Props) {
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("admin");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const router = useRouter();

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (password.length < 4) {
      setPasswordError("Password must be at least 4 characters.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (formSubmitted) validateEmail();
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (formSubmitted) validatePassword();
  };
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword || "");
      setRememberMe(true);
    }
  }, []);

  const handleSignIn = async () => {
    setFormSubmitted(true);
    setLoading(true);
    try {
      const isEmailValid = validateEmail();
      const isPasswordValid = validatePassword();

      if (!isEmailValid || !isPasswordValid) {
        setIsFormValid(false);
        setLoading(false);
        return;
      }

      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPassword", password);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }
      toast.success("Login successful");
      setLoading(false);
      router.push("/movies");
    } catch (error) {
      setLoading(false);
      setEmail("");
      setPassword("");
      console.error("Error during login:", error);
      setIsFormValid(false);
      toast.error("Invalid credentials. Please try again.");
    }
  };
  return (
      <Layout>
        <div className="h-screen flex justify-center items-center">
          <div className="w-full md:w-[300px]">
            <div className="flex justify-center items-center">
              <h1 className="md:text-[64px] text-white font-[600] text-[48px]">
                Sign in
              </h1>
            </div>
            <div className="mt-[24px]">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                error={emailError?.length > 0}
              />
              {emailError && (
                <div className="mt-[8px] text-error md:text-[14px]">
                  <p>{emailError}</p>
                </div>
              )}
            </div>
            <div className="mt-[24px]">
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                error={passwordError?.length > 0}
              />
              {passwordError && (
                <div className="mt-[8px] text-error md:text-[14px]">
                  <p>{passwordError}</p>
                </div>
              )}
            </div>
            <div className="mt-[24px] flex justify-center">
              <label className="containers text-white font-[400] text-[14px]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <span className="checkmark"></span>
                Remember me
              </label>
            </div>
            <div className="mt-[24px]">
              <Button
                label="Sign In"
                variant="primary"
                onClick={handleSignIn}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </Layout>
  );
}

export default Signin;
