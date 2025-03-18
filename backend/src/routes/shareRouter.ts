import { Request, Response, Router } from "express";
import { middleware } from "../middleware/middleware";

export const ShareRouter = Router();

ShareRouter.post("/share", middleware, async(req: Request, res: Response) => {

    const share = req.userId;
    

})