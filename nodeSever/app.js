(async function run(){
  const Koa = require("koa")
  const fs = require("fs")
  const Router = require("koa-router")
  const koaStaticCache = require('koa-static-cache');
  var cors = require('koa2-cors');
  const app = new Koa()
  const router = new Router()
  app.use(
    cors({
        origin: function(ctx) { //设置允许来自指定域名请求
            return '*'; 
        },
        maxAge: 5, 
        credentials: true, 
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], 
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] 
    })
  );


  app.use(koaStaticCache(__dirname+"/dist",{
    prefix:'/dist',
    gzip: true
  }))
  router.get('/', (ctx) => {
    console.log('进入到页面');
    const content = fs.readFileSync('./dist/index.html');
    ctx.body = content.toString();
  })

  
  // 挂载路由
  app.use(router.routes())
  app.listen(8083); //如果端口占用，这里修改
  console.log('服务器开启');
  })()