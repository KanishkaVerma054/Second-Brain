import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import { CreateUserSchema, SigninSchema } from "../types/types";
import { prismaClient } from "../db/db";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config";

export const userRouter = Router();
const salt_round = 5


userRouter.post("/signup", async (req: Request, res: Response) => {
    
    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success) {
        res.json({
            message: "Incorrect Inputs",
            error: parsedData.error
        })
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(parsedData.data?.password , salt_round);

        const user = await prismaClient.user.create({
            data: {
                // name: parsedData.data?.name,
                email: parsedData.data?.email,
                password: hashedPassword
            }
        })

        res.status(201).json({
            message: "signup succeeded",
            userId: user.id
        })
    } catch(e) {
        res.status(401).json({
            message: "User already exists"
        })
    }
})

userRouter.post("/signin", async(req: Request, res: Response) => {

    const parsedData = SigninSchema.safeParse(req.body);
    if(!parsedData.success) {
        res.json({
            message: "Incorrect credentials"
        })
        return
    }

    try {
        const user = await prismaClient.user.findFirst({
            where : {
                email: parsedData.data.email   
            }
        })
        if(!user) {
            res.status(401).json({
                message: "User not found"
            })
            return;
        }

        //Comparing hashed passwords
        const comparePassword = await bcrypt.compare(parsedData.data.password, user?.password)

        if(!comparePassword) {
            res.status(403).json({
                message: "Incorrect Password"
            })
            return;
        }
        const token = jwt.sign({
            userId: user?.id
        }, JWT_SECRET, {expiresIn: "1d"})
        res.cookie('access_token', token, {
            httpOnly: true,
            
        })


        res.json({
            message: "User signed in",
            token
        })

    } catch (error) {
        res.status(411).json({
            message: "Error while signing in "
        })
    }
})

userRouter.post("/logout", (req, res) => {
    res.clearCookie('access_token');
    res.status(200).json({
        message: "User logged out!"
    })
})