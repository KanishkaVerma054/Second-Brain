"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentSchema = exports.TagsSchema = exports.SigninSchema = exports.CreateUserSchema = void 0;
const zod_1 = require("zod");
const emailSchema = zod_1.z.string().email().min(3).max(100);
const passwordSchema = zod_1.z.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, "Password must be 8-16 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character, and must not contain spaces.");
exports.CreateUserSchema = zod_1.z.object({
    email: emailSchema,
    password: passwordSchema,
});
exports.SigninSchema = zod_1.z.object({
    email: zod_1.z.string().email().min(3).max(100),
    password: zod_1.z.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, "Password must be 8-16 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character, and must not contain spaces."),
});
exports.TagsSchema = zod_1.z.object({
    title: zod_1.z.string()
});
exports.ContentSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    link: zod_1.z.string().url("Invalid URL format"),
    type: zod_1.z.enum(["article", "video", "blog", "resource"]),
    tags: zod_1.z
        .array(zod_1.z.object({
        title: zod_1.z.string().min(1, "Tag title is required"),
    }))
        .optional(),
});
