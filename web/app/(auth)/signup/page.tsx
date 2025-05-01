"use client";
import AuthForm from "@/components/AuthForm";
import { API_BACKEND_URL } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();

  const handleSignup = async (email: string, password: string ) => {
    try {
      await axios.post(`${API_BACKEND_URL}/api/v1/signup`, {
        email,
        password
      })

      router.push("/signin");
    } catch (error) {
      throw error;
    }
  };

  return <AuthForm type="signup" onClick={handleSignup} />;
};

export default Signup;
