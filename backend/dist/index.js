"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = require("./routes/userRouter");
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1", userRouter_1.userRouter);
app.listen(config_1.PORT);
