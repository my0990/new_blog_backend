const checkLoggedIn = (ctx,next) => {
    if(!ctx.state.user){
        ctx.status = 401;
        return next();
    }
    return next();
}

export default checkLoggedIn;