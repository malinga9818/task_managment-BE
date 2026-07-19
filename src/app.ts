import cookieParser from "cookie-parser";
import express from "express";
import router from "./routes/routes.js";

const app = express()

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);
export default app;