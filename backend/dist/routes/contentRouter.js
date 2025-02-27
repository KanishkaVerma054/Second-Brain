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
exports.contentRouter = void 0;
const express_1 = require("express");
const types_1 = require("../types/types");
const db_1 = require("../db/db");
exports.contentRouter = (0, express_1.Router)();
exports.contentRouter.post("/content", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const contentData = types_1.ContentSchema.safeParse(req.body);
    if (!contentData.success) {
        res.status(401).json({
            message: "Error while putting it to db",
        });
        return;
    }
    const userId = req.userId;
    try {
        const content = yield db_1.prismaClient.content.create({
            data: {
                title: (_a = contentData.data) === null || _a === void 0 ? void 0 : _a.title,
                link: contentData.data.link,
                type: contentData.data.type,
                // userId: contentData.data.userId,
                userId: userId !== null && userId !== void 0 ? userId : "",
                // createdAt: contentData.data.createdAt,
                // this will
                tags: contentData.data.tags
                    ? {
                        connectOrCreate: contentData.data.tags.map((tag) => ({
                            where: { title: tag.title },
                            create: { title: tag.title },
                        })),
                    }
                    : undefined, // If no tags, don't include this field
            },
        });
        res.status(201).json({
            message: "Content Created",
            contentId: content.id,
            createdAt: content.createdAt,
        });
    }
    catch (error) {
        res.status(401).json({
            message: "Error in creating content",
            error: error,
        });
    }
}));
exports.contentRouter.get("/content", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const getContents = yield db_1.prismaClient.content.findMany({
            where: {
                userId: userId,
            },
        });
        res.json({
            getContents,
        });
    }
    catch (error) {
        res.json({
            message: "error fetching contents",
            error: error,
        });
    }
}));
exports.contentRouter.delete("/content/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentId = req.params.id;
        const userId = req.userId;
        if (!userId) {
            res.status(403).json({
                message: "Unauthorized request",
            });
            return;
        }
        const existingContent = yield db_1.prismaClient.content.findFirst({
            where: {
                id: contentId,
                userId: req.userId,
            },
        });
        if (!existingContent) {
            res.status(404).json({ message: "Content not found or unauthorized" });
            return;
        }
        yield db_1.prismaClient.content.delete({
            where: {
                id: contentId,
            },
        });
        res.status(200).json({
            message: "Content deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting the content or content doesen't exist",
            error: error,
        });
    }
}));
