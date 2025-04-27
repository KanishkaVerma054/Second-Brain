"use client"
import AuthForm from "@/components/AuthForm"
import { useRouter } from "next/navigation"


const signup = () => {
    
    const router = useRouter()
    const handleSignup = () => {

        const response = 

        router.push("/signin")
    }

    return <AuthForm type="signup" onSubmit={handleSignup} />
}

export default signup