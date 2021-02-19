const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');

const app = new Koa();

app.use(cors());
app.use(koaBody({json: true}));
/*
app.use(async (ctx, next) => {
    ctx.body = 'server is working';
});
*/
const notes = [{id: 9999, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus sagittis magna, sit amet rhoncus nunc commodo eget. Aenean vitae ipsum quis lacus volutpat interdum in vel est.'},
 {id: 99999, content: 'Nulla placerat purus in erat pellentesque, ornare pretium nunc auctor. Ut molestie volutpat nibh, vel congue ante commodo porttitor.'}];
let nextId = 1;
console.log(notes)
const router = new Router();

router.get('/notes', async (ctx, next) => {
    console.log('get');
    console.log(ctx.request.body);
    ctx.response.body = notes;
});


router.post('/notes', async(ctx, next) => {
    console.log('post');
    console.log(ctx.request.body);
    notes.push({...ctx.request.body, id: nextId++});
    console.log(notes)
    ctx.response.status = 204;
});

router.delete('/notes/:id', async(ctx, next) => {
    console.log('delete');
    console.log(ctx.params.id);
    const noteId = Number(ctx.params.id);
    const index = notes.findIndex(o => o.id === noteId);
    if (index !== -1) {
        notes.splice(index, 1);
    }
    ctx.response.status = 204;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7777;
const server = http.createServer(app.callback());
server.listen(port, () => console.log('server started'));
