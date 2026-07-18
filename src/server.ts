import app from "./app.js";
import dotenv from "dotenv"
import { AppDataSource } from "./config/data.source.js";
dotenv.config()

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized !");
        app.listen(PORT, () => console.log(`The server is runing on the port ${PORT}`));
    })