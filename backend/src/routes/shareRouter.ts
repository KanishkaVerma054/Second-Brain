import { Request, Response, Router } from "express";
import { middleware } from "../middleware/middleware";
import { random } from "../utils/utils";
import { prismaClient } from "../db/db";

export const shareRouter = Router();

shareRouter.post("/share", middleware, async(req: Request, res: Response) => {

    const share = req.body.share;
    const userId = req.userId;

    if(!userId) {
      res.status(403).json({
          message: "User not found or unauthorized request"
      })
        return;
    }

    try {
        if(share) {
            const hash = random(30)
            // upsert used to create or update link // race condition
            const link = await prismaClient.share.upsert({
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
            })
            res.json({
                hash: link.hash
            })
            return;
        } else {
            // delete if the link exist
            await prismaClient.share.deleteMany({
                where: {
                    userId
                }
            })
            res.status(200).json({
                message: "Link removed"
            })
            return;
        }

    } catch (error) {
        console.error("Error", error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

shareRouter.get("/:shareLink", async(req: Request, res: Response) => {
    const hash = req.params.shareLink;

    try{
      const link = await prismaClient.share.findUnique({
        where: {
            hash
        },
        include: {
            user: true
        }
      });
      
      if(!link) {
        res.status(404).json({
            message: "Link not found"
        })
        return;
      }

      const getContent = await prismaClient.content.findMany({
        where: {
            userId: link.userId
        }
      }) 

      if(!link.user) {
        res.status(404).json({
            message: "User not found"
        })
        return;
      }

      res.status(200).json({
        getContent
      })
    //   return;

    } catch(error) {
        console.error("Error in getting link", error)
        res.status(500).json({ 
            message: "Internal server error" 
        });
    }
})