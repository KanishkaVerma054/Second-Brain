"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const middleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers["authorization"]) !== null && _a !== void 0 ? _a : "";
    const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
    if (typeof decoded == "string") {
        return;
    }
    if (decoded) {
        req.userId = decoded.userId;
        next();
    }
    else {
        res.status(403).json({
            message: "unauthorized"
        });
    }
};
exports.middleware = middleware;
