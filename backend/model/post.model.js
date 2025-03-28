

import mongoose, { Schema } from "mongoose";
import crypto from "crypto"; // Import crypto module

const postSchema = new Schema({
    user: 
    {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    img: 
    {
        type: String,
        default: ""
    },
    title: 
    {
        type: String,
        required: true,
    },
    slug: 
    {
        type: String,
        unique: true
    },
    subject:
    {
        type:String,
        default:"General"
    },
    desc: 
    {
        type: String,
    },
    content: 
    {
        type: String,
        required: true,
    },
    isFeatured: 
    {
        type: Boolean,
        default: false
    },
    visits: 
    {
        type: Number,
        default: 0
    }
}, { timestamps: true });


postSchema.pre("save", function(next) 
{
    if (!this.slug) {
        const hash = crypto.createHash("sha256").update(this.title + Date.now()).digest("hex").substring(0, 10);
        this.slug = `${this.title.toLowerCase().replace(/\s+/g, "-")}-${hash}`; 
    }
    next();
});

export const postModel = mongoose.models.PostInfo || mongoose.model("PostInfo", postSchema);