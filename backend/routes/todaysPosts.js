import express from "express"
import { getTodaysPosts, getTPosts } from "../controller/todaysPostController.js";

const router = express.Router();

router.get("/",getTPosts)

export default router