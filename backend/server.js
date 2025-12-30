import app from "./src/app.js";
import connectDB from "./src/db/db.js";

connectDB();

app.listen(3000, () => {
    console.log("PORT listening at 3000");
})