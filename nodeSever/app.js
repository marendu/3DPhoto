(async function run(){
  const Koa = require("koa")
  const fs = require("fs")
  const Router = require("koa-router")
  const koaStaticCache = require('koa-static-cache');
  var cors = require('koa2-cors');
  const app = new Koa()
  // 定义父路由
  const router = new Router()
  app.use(
    cors({
        origin: function(ctx) { //设置允许来自指定域名请求
            return '*'; //只允许http://localhost:8080这个域名的请求
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    })
  );


  app.use(koaStaticCache(__dirname+"/dist",{
    prefix:'/dist',
    gzip: true
  }))
  router.get('/', (ctx) => {
    console.log(11111);
    const content = fs.readFileSync('./dist/index.html');
    ctx.body = content.toString();
  })

  
  // 挂载路由
  app.use(router.routes())
  app.listen(8083);
  console.log('服务器开启');
  })()