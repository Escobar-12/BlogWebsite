import express from "express"
import { postModel } from "../model/post.model.js";
import { getPosts, getPost, addPost, deletePost, savePost, checkSaved, getPostById, getSaved, getTodayPosts } from "../controller/postsControllers.js";
import { verifyAccessToken } from "../middleware/VerifyAuth.js";

const router = express.Router();


router.get("/", getPosts);
router.get("/:slug", getPost);
router.get("/todayPosts",getTodayPosts)
router.get("/id/:postId", getPostById);
router.post("/add",verifyAccessToken ,addPost);
router.delete("/:id",deletePost);
router.post("/save", verifyAccessToken,savePost)
router.post("/checkSaved", verifyAccessToken,checkSaved)
router.post("/savedPosts",verifyAccessToken,getSaved)



export default router;