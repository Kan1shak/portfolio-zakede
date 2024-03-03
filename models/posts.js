import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: false
    },
    qlDelta: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: true
    }
});

export const posts = mongoose.model("posts", postSchema);