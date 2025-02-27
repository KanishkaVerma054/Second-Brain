"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = require("./routes/userRouter");
const config_1 = require("./config");
const contentRouter_1 = require("./routes/contentRouter");
const middleware_1 = require("./middleware/middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1", userRouter_1.userRouter);
app.use("/api/v1", middleware_1.middleware, contentRouter_1.contentRouter);
app.listen(config_1.PORT);
