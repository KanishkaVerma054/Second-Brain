import express from "express"
import { userRouter } from "./routes/userRouter";
import { PORT } from "./config";
import { contentRouter } from "./routes/contentRouter";
import { middleware } from "./middleware/middleware";
import cookieParser from "cookie-parser";
import { shareRouter } from "./routes/shareRouter";
import { tagsRouter } from "./routes/tagsRouter";


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", userRouter);
app.use("/api/v1", middleware ,contentRouter);
app.use("/api/v1/brain", shareRouter)
app.use("/api/v1/", tagsRouter)

app.listen(PORT)