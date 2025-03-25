import { postModel } from "../model/post.model.js";

export const getPosts = async (req, res) => {
    try {
        const page = isNaN(parseInt(req.query.page)) ? 0 : Math.max(0, parseInt(req.query.page) - 1);
        const category = req.query.category;
        const totalPosts = category
            ? await postModel.countDocuments({ subject: category })
            : await postModel.countDocuments();
        let posts;
        if (category) {
            posts = await postModel.find({ subject: category }).skip(5 * page).limit(5);
        } else {
            posts = await postModel.find().skip(5 * page).limit(5);
        }
        res.status(200).json({
            success:true,
            posts,
            totalPosts,
            currentPage: page + 1,
            totalPages: Math.ceil(totalPosts / 5),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getPost = async (req, res) => {
    try {
        const post = await postModel.findOne({ slug: req.params.slug });
        if (!post) {
            return res.status(404).json({ success: false, message: "no post was found" });
        }
        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const addPost = async (req, res) => {
    try {
        const newPost = new postModel(req.body);
        const post = await newPost.save();
        res.status(201).json({ success: true, post: post });
    } catch (err) {
        console.error(err);
        res.status(400).json({ success: false, message: "Invalid post data" });
    }
};

export const deletePost = async (req, res) => {
    try {
        const deletedPost = await postModel.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ success: false, message: "no post was deleted" });
        }
        res.status(200).json({ success: true, message: "Post has been deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

