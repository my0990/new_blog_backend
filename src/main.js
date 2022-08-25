require('dotenv').config();
import Koa from 'koa';
const app = new Koa();
import Router from 'koa-router';
const router = new Router();
import api  from './api'
import mongoose from 'mongoose';
import bodyParser from 'koa-bodyparser'
import jwtMiddleware from './lib/jwtMiddleware';

const {PORT, MONGO_URI} = process.env;
mongoose
.connect(MONGO_URI)
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch(e => {
    console.log(e)
})
router.get('/test', ctx => {
    ctx.body = 'router 성공'
})

router.use('/api',api.routes());


app.use(bodyParser());
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());
const port = PORT || 4000;
app.listen(port, () => {
    console.log('listening to', port)
})