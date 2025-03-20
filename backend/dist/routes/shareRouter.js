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
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareRouter = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware/middleware");
const utils_1 = require("../utils/utils");
const db_1 = require("../db/db");
exports.shareRouter = (0, express_1.Router)();
exports.shareRouter.post("/share", middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    const userId = req.userId;
    if (!userId) {
        res.status(403).json({
            message: "User not found or unauthorized request"
        });
        return;
    }
    try {
        if (share) {
            const hash = (0, utils_1.random)(30);
            // upsert used to create or update link // race condition
            const link = yield db_1.prismaClient.share.upsert({
                where: {
                    userId
                },
                update: {
                    hash
                },
                create: {
                    userId,
                    hash
                }
            });
            res.json({
                hash: link.hash
            });
            return;
        }
        else {
            // delete if the link exist
            yield db_1.prismaClient.share.deleteMany({
                where: {
                    userId
                }
            });
            res.status(200).json({
                message: "Link removed"
            });
            return;
        }
    }
    catch (error) {
        console.error("Error", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}));
exports.shareRouter.get("/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    try {
        const link = yield db_1.prismaClient.share.findUnique({
            where: {
                hash
            },
            include: {
                user: true
            }
        });
        if (!link) {
            res.status(404).json({
                message: "Link not found"
            });
            return;
        }
        const getContent = yield db_1.prismaClient.content.findMany({
            where: {
                userId: link.userId
            }
        });
        if (!link.user) {
            res.status(404).json({
                message: "User not found"
            });
            return;
        }
        res.status(200).json({
            getContent
        });
        //   return;
    }
    catch (error) {
        console.error("Error in getting link", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}));
