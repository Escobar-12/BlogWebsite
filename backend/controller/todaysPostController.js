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


export const getTPosts = async (req, res) => 
{
    try 
    {
        const limit = 10;
    
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
        const posts = await postModel.find({
            updatedAt: { $gte: oneDayAgo }
        }).sort({ updatedAt: -1 });
    
        res.status(200).json({
            success: true,
            posts,
        });
    } 
    catch (err) 
    {
        console.error(err); 
        res.status(500).json({ success: false, message: "Server error" });
    }
};
