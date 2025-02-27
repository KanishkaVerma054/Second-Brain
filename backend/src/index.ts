import express from "express"
import { userRouter } from "./routes/userRouter";
import { PORT } from "./config";
import { contentRouter } from "./routes/contentRouter";
import { middleware } from "./middleware/middleware";


const app = express();
app.use(express.json());

app.use("/api/v1", userRouter);
app.use("/api/v1", middleware ,contentRouter);

app.listen(PORT)