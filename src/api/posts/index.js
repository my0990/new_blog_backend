import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl'
import checkLoggedIn from '../../lib/checkLoggedIn';

const posts = new Router();

const post = new Router();

posts.get('/', postsCtrl.list); //포스트 목록 가져오기
posts.post('/',checkLoggedIn, postsCtrl.write); //포스트 작성하기

post.delete('/',checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove); //포스트 삭제하기
post.patch('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update); //포스트 수정하기
post.get('/', postsCtrl.read); //특정 포스터 가져오기

posts.use('/:id', postsCtrl.getPostById, post.routes()); //파라미터가 있는 요청

export default posts;