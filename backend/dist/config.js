"use strict";
// import jwt, { Secret } from "jsonwebtoken"
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.JWT_SECRET = void 0;
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env file");
}
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.PORT = process.env.PORT;
