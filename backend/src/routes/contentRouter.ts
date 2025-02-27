import { Request, Response, Router } from "express";
import { ContentSchema } from "../types/types";
import { prismaClient } from "../db/db";
import { middleware } from "../middleware/middleware";

interface AuthenticatedRequest extends Request {
  userId?: string; // Match your Prisma schema's User ID type
}

export const contentRouter = Router();

contentRouter.post("/content", async (req: Request, res: Response) => {
  const contentData = ContentSchema.safeParse(req.body);
  if (!contentData.success) {
    res.status(401).json({
      message: "Error while putting it to db",
    });
    return;
  }

  const userId = req.userId;
  try {
    const content = await prismaClient.content.create({
      data: {
        title: contentData.data?.title,
        link: contentData.data.link,
        type: contentData.data.type,
        // userId: contentData.data.userId,
        userId: userId ?? "",
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
  } catch (error) {
    res.status(401).json({
      message: "Error in creating content",
      error: error,
    });
  }
});

contentRouter.get("/content", async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const getContents = await prismaClient.content.findMany({
      where: {
        userId: userId,
      },
    });
    res.json({
      getContents,
    });
  } catch (error) {
    res.json({
      message: "error fetching contents",
      error: error,
    });
  }
});

contentRouter.delete("/content/:id", async (req: Request, res: Response) => {
  try {
    const contentId = req.params.id;
    const userId = req.userId;

    if (!userId) {
      res.status(403).json({
        message: "Unauthorized request",
      });
      return;
    }

    const existingContent = await prismaClient.content.findFirst({
      where: {
        id: contentId,
        userId: req.userId,
      },
    });

    if (!existingContent) {
      res.status(404).json({ message: "Content not found or unauthorized" });
      return;
    }

    await prismaClient.content.delete({
      where: {
        id: contentId,
      },
    });

    res.status(200).json({
      message: "Content deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting the content or content doesen't exist",
      error: error,
    });
  }
});
