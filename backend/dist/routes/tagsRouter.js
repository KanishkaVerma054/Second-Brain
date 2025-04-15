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
exports.tagsRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
exports.tagsRouter = (0, express_1.Router)();
exports.tagsRouter.get("/tags", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const getTags = yield db_1.prismaClient.tags.findMany({
            where: {
                contents: {
                    some: {
                        userId: userId,
                    },
                },
            },
            orderBy: {
                title: "asc",
            },
            select: {
                id: true,
                title: true,
            },
        });
        res.status(200).json({
            getTags: getTags,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to retrieve tags.",
        });
    }
}));
exports.tagsRouter.get("/:tagId/content", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tagId } = req.params;
    if (!tagId) {
        res.status(400).json({
            message: "Tag ID is required",
        });
        return;
    }
    try {
        const fetchContent = yield db_1.prismaClient.content.findMany({
            where: {
                tags: {
                    some: {
                        id: tagId,
                    },
                },
            },
            //   include: {
            //     tags: true,
            //   },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.status(200).json({
            fetchContent: fetchContent,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to retrieve content for the specified tag"
        });
    }
}));
