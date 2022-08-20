import Router from 'koa-router';
const api = new Router();
import posts from './posts'

api.get('/test', ctx => {
    ctx.body = 'router경로 설정 성공'
});

api.use('/posts',posts.routes());

export default api;