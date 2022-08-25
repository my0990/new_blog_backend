import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const auth = new Router();

// auth.get('/',ctx => {
//     ctx.body = 'test'
// })

auth.post('/register',authCtrl.register);
auth.post('/login',authCtrl.login);
auth.get('/check',authCtrl.check);
auth.get('/test', authCtrl.test);
auth.post('/logout',authCtrl.logout);


export default auth;