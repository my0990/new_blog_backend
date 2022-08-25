import Router from 'koa-router';
const api = new Router();
import posts from './posts';
import auth from './auth';



api.use('/posts',posts.routes());
api.use('/auth', auth.routes());
export default api;