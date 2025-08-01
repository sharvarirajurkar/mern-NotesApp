import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import path from "path";


import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();


//middleware
if(process.env.NODE_ENV!=="production"){
    app.use(
        cors({
        origin:"http://localhost:5173",
    })
    );
}
app.use(express.json()); //this middleware will parse the json bodies: req.body 
app.use(rateLimiter);


//simple custom middleware
//app.use((req,res,next) => {
//    console.log(`Req method is ${req.method} & Req url is ${req.url}`);
//    next();
//});
//used for auth check etc
//rate limiting 

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV =="production"){
app.use(express.static(path.join(__dirname,"../frontend/dist")));

app.get("*", (req, res)=> {
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
});
}
connectDB().then(() => {
    app.listen(5001, () => {
        console.log("Server started on PORT:", PORT);
    });
})

//mongodb+srv://sharvarimrajurkar:70V3RIFuiECE2scI@cluster0.bn25sc1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
