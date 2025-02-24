import {z} from "zod";

const emailSchema = z.string().email().min(3).max(100);
const passwordSchema = z.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, "Password must be 8-16 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character, and must not contain spaces.");

export const CreateUserSchema = z.object({
    name: z.string().min(3).max(50),
    email: emailSchema,
    password: passwordSchema,
}) 

export const SigninSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
})