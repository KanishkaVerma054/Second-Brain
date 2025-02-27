import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config"

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    // const token = req.headers["authorization"] ?? ""
    const token = req.cookies.access_token;
    if(!token) {
        res.status(401).json ({
            message: "User not AuthenticatorResponse. Token not found"
        })
        return;
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if(typeof decoded == "string") {
        return;
    }

    if (decoded) {
        req.userId = decoded.userId;
        next()
    } else {
        res.status(403).json({
            message: "unauthorized"
        })
    }
}