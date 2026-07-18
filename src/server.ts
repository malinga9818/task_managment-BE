import app from "./app.js";
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("The app is listening On: ", PORT)
});