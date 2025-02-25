"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const types_1 = require("../types/types");
const db_1 = require("../db/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
exports.userRouter = (0, express_1.Router)();
const salt_round = 5;
exports.userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const parsedData = types_1.CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect Inputs",
            error: parsedData.error
        });
        return;
    }
    try {
        const hashedPassword = yield bcrypt_1.default.hash((_a = parsedData.data) === null || _a === void 0 ? void 0 : _a.password, salt_round);
        const user = yield db_1.prismaClient.user.create({
            data: {
                name: (_b = parsedData.data) === null || _b === void 0 ? void 0 : _b.name,
                email: (_c = parsedData.data) === null || _c === void 0 ? void 0 : _c.email,
                password: hashedPassword
            }
        });
        res.status(201).json({
            message: "signup succeeded",
            userId: user.id
        });
    }
    catch (e) {
        res.status(401).json({
            message: "User already exists"
        });
    }
}));
exports.userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect credentials"
        });
        return;
    }
    try {
        const user = yield db_1.prismaClient.user.findFirst({
            where: {
                email: parsedData.data.email
            }
        });
        if (!user) {
            res.status(401).json({
                message: "User not found"
            });
            return;
        }
        //Comparing hashed passwords
        const comparePassword = yield bcrypt_1.default.compare(parsedData.data.password, user === null || user === void 0 ? void 0 : user.password);
        if (!comparePassword) {
            res.status(403).json({
                message: "Incorrect Password"
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user === null || user === void 0 ? void 0 : user.id
        }, config_1.JWT_SECRET);
        res.json({
            message: "User signed in",
            token
        });
    }
    catch (error) {
        res.status(411).json({
            message: "UsServer error "
        });
    }
}));
