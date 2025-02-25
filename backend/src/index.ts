import express from "express"
import { userRouter } from "./routes/userRouter";
import { PORT } from "./config";


const app = express();
app.use(express.json());

app.use("/api/v1", userRouter);

app.listen(PORT)