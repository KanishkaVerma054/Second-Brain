"use client";
import AuthForm from "@/components/AuthForm";
import { API_BACKEND_URL } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";

const Signin = () => {
  const router = useRouter();
  const handleSignin = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BACKEND_URL}/api/v1/signin`, {
        email,
        password
      });

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);

      router.push("/brain");
    } catch (error) {
      console.error("Signin failed");
    }
  };

  return <AuthForm type="signin" onClick={handleSignin} />;
};

export default Signin;