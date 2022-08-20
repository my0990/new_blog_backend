import mongoose from "mongoose";
 const { Schema } = mongoose;

//  스키마생성
 const PostSchema = new Schema({
    title: String,
    body: String,
    tags: [String],
    publishedDate: {
        type: Date,
        default: Date.now,
    }
 })
// 모델생성
 const Post = mongoose.model('Post', PostSchema);
 export default Post;