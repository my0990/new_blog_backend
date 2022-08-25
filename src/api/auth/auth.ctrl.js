import User from "../../models/user";
import Joi from "joi";

export const test = ctx => {
    ctx.body = 'testest'
}

export const register = async ctx => {
    const schema = Joi.object().keys({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required(),
        password: Joi.string().required(),
    })
    const result = schema.validate(ctx.request.body);
    if(result.error){
        ctx.status = 404;
        ctx.body = result.error;
        return;
    }
    const {username,password} = ctx.request.body;
    try {
        const exist = await User.findByUsername(username)
        if(exist) {
            ctx.status = 409;
            return;
        }
        const user = new User({
            username,
        });
        await user.setPassword(password);
        await user.save();

 
        ctx.body = user.serialize();
        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
        });
    } catch (e) {
        ctx.throw(500, e);
    }
    

}

export const login = async ctx => {
    // const schema = Joi.object().keys({
    //     username: Joi.string()
    //         .alphanum()
    //         .min(3)
    //         .max(20)
    //         .required(),
    //     password: Joi.string().required()
    // })
    // const result = schema.validate(ctx.request.body);
    // if(result.error){
    //     ctx.status = 404;
    //     return;
    // }
    const {username,password} = ctx.request.body
    try {
        const user= await User.findByUsername(username);
        if(!user){
            ctx.status = 404;
            ctx.body = 'id가 없습니다'
        }
        
        const valid = await user.checkPassword(password);
        if(!valid){
            ctx.status = 401;
            return;
        }
        ctx.body = user.serialize();
        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
        });
    } catch(e) {
        ctx.throw(500,e)

    }
};

export const check = async ctx => {
    const { user } = ctx.state;
    console.log(user)
    if(!user){
        ctx.status = 401;
        return;
    }
    ctx.body = user;
}

export const logout = ctx => {
    ctx.cookies.set('access_token');
    ctx.status = 204;
};