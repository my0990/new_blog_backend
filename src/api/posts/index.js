import Router from 'koa-router';
const posts = new Router();

const printInfo = ctx => {
    ctx.body ={
        method: ctx.method,
        path: ctx.path,
        params: ctx.params
    }
}

posts.get('/', printInfo)

export default posts;