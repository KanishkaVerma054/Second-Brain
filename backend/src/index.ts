import express from "express"
import { userRouter } from "./routes/userRouter";
import { PORT } from "./config";
import { contentRouter } from "./routes/contentRouter";
import { middleware } from "./middleware/middleware";
import cookieParser from "cookie-parser";
import { shareRouter } from "./routes/shareRouter";


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", userRouter);
app.use("/api/v1", middleware ,contentRouter);
app.use("/api/v1/brain", shareRouter)

app.listen(PORT)