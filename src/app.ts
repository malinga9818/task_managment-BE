import cookieParser from "cookie-parser";
import express from "express";
import router from "./routes/routes.js";
import cors from "cors";

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));

app.use("/api", router);
export default app;