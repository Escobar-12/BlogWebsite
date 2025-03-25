import express from "express"
import { getTodaysPosts } from "../controller/todaysPostController.js";

const router = express.Router();

router.get("/",getTodaysPosts)

export default router