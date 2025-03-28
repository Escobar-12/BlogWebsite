import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import AuthRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import { VerifyRoles } from "./middleware/VerifyRoles.js";
import { allowedRoles } from "./config/allowedRoles.js";
import { credentials } from "./middleware/credentials.js";
import PostRouter from "./routes/postsRoutes.js"
import { userModel } from "./model/userInfo.js";
import AuthorRouter from "./routes/authorRoutes.js";
import TodaysRouter from "./routes/todaysPosts.js";
import { corsOptions } from "./config/corsOrigins.js";
import imgKitRouter from "./routes/imgKitRouter.js";


dotenv.config();
const app = express();
connectDB();

const Port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser()); 
app.use(credentials);
app.use(cors(corsOptions)); 



app.use("/api/auth",AuthRouter);

app.get('/hello',VerifyRoles(allowedRoles.Editor,allowedRoles.Admin),(req,res)=>
{
    res.send("hello");
})


app.use("/api/imgKit",imgKitRouter);

app.get("/users",async (req,res)=>
{
    const users = await userModel.find();
    console.log(req.cookies)
    res.status(200).json(users);
})

app.use('/api/post',PostRouter);
app.use('/api/author',AuthorRouter);

app.use('/api/todays',TodaysRouter)

mongoose.connection.once("open",()=>
{
    app.listen(Port,()=>
    {
        console.log(`Server started in port: ${Port}`);
    })
})