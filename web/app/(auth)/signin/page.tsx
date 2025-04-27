"use client";
import AuthForm from "@/components/AuthForm";
import { API_BACKEND_URL } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";

const signin = () => {
  const router = useRouter();

  const handleSignin = async (email: string, password: string) => {
    try {
      const response = axios.post(`${API_BACKEND_URL}/api/v1/signin`, {
        email,
        password
      });

      router.push("/brain");
    } catch (error) {
      throw error
    }
  };

  return <AuthForm type="signin" onSubmit={handleSignin} />;
};

export default signin;
