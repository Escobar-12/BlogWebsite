

import mongoose, { Schema } from "mongoose";

const todayPostsSchema = new Schema({
    postID: 
    {
        type: [Schema.Types.ObjectId],
        ref: "PostInfo",
    },
});


export const todayPostModel = mongoose.models.todayPosts || mongoose.model("TodaysPost", todayPostsSchema);
