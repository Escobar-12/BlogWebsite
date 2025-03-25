import { postModel } from "../model/post.model.js";
import { todayPostModel } from "../model/todaysPost.model.js"

export const getTodaysPosts = async(req,res) =>
{
    try
    {
        const todayPosts = await todayPostModel.findOne();
        if (!todayPosts || !todayPosts.postID || todayPosts.postID.length === 0) {
            return res.status(404).json({ success: false, message: "No today's posts found" });
        }
        const data = await postModel.find({ _id: { $in: todayPosts.postID } });
        res.status(200).json({data});
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
}