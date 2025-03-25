import express from "express"
import { postModel } from "../model/post.model.js";
import { getPosts, getPost, addPost, deletePost } from "../controller/postsControllers.js";

const router = express.Router();


router.get("/", getPosts);
router.get("/:slug", getPost);
router.post("/",addPost);
router.delete("/:id",deletePost);


export default router;