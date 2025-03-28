import jwt from "jsonwebtoken"
import { postModel } from "../model/post.model.js";
import { userModel } from "../model/userInfo.js";


export const getPosts = async (req, res) => 
{
    try {
        const page = isNaN(parseInt(req.query.page)) ? 0 : Math.max(0, parseInt(req.query.page) - 1);
        const category = req.query.category;
        const limit = 15;
        const totalPosts = category
            ? await postModel.countDocuments({ subject: category })
            : await postModel.countDocuments();
        let posts;
        if (category) {
            posts = await postModel.find({ subject: category }).skip(limit * page).limit(5);
        } else {
            posts = await postModel.find().skip(limit * page).limit(limit);
        }
        res.status(200).json({
            success:true,
            posts,
            totalPosts,
            currentPage: page + 1,
            totalPages: Math.ceil(totalPosts / limit),
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getPost = async (req, res) => 
{
    try {
        const post = await postModel.findOne({ slug: req.params.slug });
        if (!post) {
            return res.status(404).json({ success: false, message: "no post was found" });
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
export const addPost = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        console.log(req.body)
        const newPost = new postModel({
            ...req.body, 
            user: user._id 
        });

        const post = await newPost.save();

        await userModel.updateOne(
            { _id: user._id },
            { $addToSet: { createdPosts: post._id } }
        );

        res.status(201).json({ success: true, post });
    } catch (err) {
        res.status(400).json({ success: false, message: "Invalid post data" });
    }
};

export const deletePost = async (req, res) => 
{
    try {
        const deletedPost = await postModel.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ success: false, message: "no post was deleted" });
        }
        res.status(200).json({ success: true, message: "Post has been deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const savePost = async (req, res) => 
{
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const post = await postModel.findById(req.body.postId);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        if(req.body.saved)
        {
            await userModel.updateOne(
                { _id: user._id },
                { $addToSet: { savedPosts: post._id } } 
            );
        }
        else
        {
            await userModel.updateOne(
                { _id: user._id },
                { $pull: { savedPosts: post._id } }
            );
        }
        

        res.status(200).json({ success: true, message: "Post saved successfully" });
    } catch (err) {
        res.status(400).json({ success: false, message: "Invalid request data" });
    }
};


export const checkSaved = async (req, res) => 
    {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isSaved = user.savedPosts.includes(req.body.postId);

        res.status(200).json({ success: true, isSaved });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getSaved = async (req,res) =>
{
    try {
        const id = req.body.id;
        if(id !== req.user.id) return res.status(500).json({ success: false, message: "Not allowed" });
        const user = await userModel.findById(req.user.id);
        if (!user) 
        {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, savedPosts:user.savedPosts });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getPostById = async (req, res) =>
{
    try {
        const post = await postModel.findOne({ _id: req.params.postId });
        if (!post) {
            return res.status(404).json({ success: false, message: "no post was found" });
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}
