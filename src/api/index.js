import Router from 'koa-router';
const api = new Router();
import posts from './posts';
import auth from './auth';



api.use('/posts',posts.routes());//posts 경로 라우터 설정
api.use('/auth', auth.routes());// auth 경로 라우터 설정
export default api;