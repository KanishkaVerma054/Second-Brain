"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninSchema = exports.CreateUserSchema = void 0;
const zod_1 = require("zod");
const emailSchema = zod_1.z.string().email().min(3).max(100);
const passwordSchema = zod_1.z.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, "Password must be 8-16 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character, and must not contain spaces.");
exports.CreateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(50),
    email: emailSchema,
    password: passwordSchema,
});
exports.SigninSchema = zod_1.z.object({
    email: zod_1.z.string().email().min(3).max(100),
    password: zod_1.z.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, "Password must be 8-16 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character, and must not contain spaces."),
});
