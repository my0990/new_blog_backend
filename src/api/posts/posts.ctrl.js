import Post from "../../models/post";
import mongoose from "mongoose";


const {ObjectId} = mongoose.Types; //ID 형식 확인하기

export const getPostById = async (ctx, next) => {
    const {id} = ctx.params; 
    //ID가 mongodb _id 형식이 아니라면 400 error(bad request)
    if (!ObjectId.isValid(id)){
        ctx.status = 400;
        return;
    }
    try {
        const post = await Post.findById(id); //Post 컬렉션에서 id로 문서 찾기
        if (!post) { //해당 문서가 없으면 404 not foun err
            ctx.status = 404;
            return;
        }
        ctx.state.post = post; //post가 있으면 state에 집어넣기
        return next();
    } catch(e) {
        ctx.throw(500,e);
    }
};

export const checkOwnPost = (ctx,next) => {
    const {user,post} = ctx.state;
    if(post.user._id.toString() !== user._id){
        ctx.status = 403;
        return;
    }
    return next();
}

export const write = async ctx => {
    const {title, body, tags} = ctx.request.body;
    const post = new Post({
        title,
        body,
        tags,
        user: ctx.state.user
    });
    try {
        await post.save();
        ctx.body = post;
    } catch(e) {
        ctx.throw(500, e);
    }
};

export const list = async ctx => {
    try {
        const posts  = await Post.find().exec()
        ctx.body = posts
    } catch (e) {
        ctx.throw(500,e)
    };
};

export const read =  ctx => {
    ctx.body = ctx.state.post;
};

export const remove = async ctx => {
    const {id} = ctx.params;
    try {
        await Post.findByIdAndRemove(id);
        ctx.status = 204;
    } catch (e) {
        ctx.throw(500,e);
    }
}

export const update = async ctx => {
    const {id} = ctx.params;
    
    try {
        const post = await Post.findByIdAndUpdate(id,ctx.request.body, {
            new: true,
        }).exec();
        if (!post){
            ctx.status = 404;
            return
        }
        ctx.body = post;
    } catch (e) {
        ctx.throw(500,e);
    }
};

