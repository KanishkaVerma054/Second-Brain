import {z} from "zod";

const emailSchema = z.string().email().min(3).max(100);
const passwordSchema = z.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, "Password must be 8-16 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character, and must not contain spaces.");

export const CreateUserSchema = z.object({
    name: z.string().min(3).max(100),
    email: emailSchema,
    password: passwordSchema,
}) 

export const SigninSchema = z.object({
    email: z.string().email().min(3).max(100),
    password: z.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, "Password must be 8-16 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character, and must not contain spaces."),
})

export const TagsSchema = z.object({
    title: z.string()
})

export const ContentSchema = z.object({
    title: z.string().min(1, "Title is required"),
    link: z.string().url("Invalid URL format"),
    type: z.enum(["article", "video", "blog", "resource"]),
    tags: z
      .array(
        z.object({
          title: z.string().min(1, "Tag title is required"),
        })
      )
      .optional(),
  });