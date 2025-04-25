import { Request, Response, Router } from "express";
import { prismaClient } from "../db/db";
import { messageInRaw } from "svix";

export const tagsRouter = Router();

tagsRouter.get("/tags", async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const getTags = await prismaClient.tags.findMany({
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
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve tags.",
    });
  }
});

tagsRouter.get("/:tagId/content", async (req: Request, res: Response) => {
  const { tagId } = req.params;

  if (!tagId) {
    res.status(400).json({
      message: "Tag ID is required",
    });
    return;
  }

  try {
    const fetchContent = await prismaClient.content.findMany({
      where: {
        tags: {
          some: {
            id: tagId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      fetchContent: fetchContent,
    });
  } catch (error) {
    res.status(500).json({
        message: "Failed to retrieve content for the specified tag"
    })
  }
});
