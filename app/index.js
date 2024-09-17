const Koa = require('koa')
const koaBody = require('koa-body')
const routing = require('./routes')
const parameter = require('koa-parameter')//校验参数
const path = require('path')
const error = require('koa-json-error')//自动处理错误信息
const mongoose = require('mongoose')
const koaStatic = require('koa-static')
const { connectionStr } = require('./config')

const app = new Koa()

mongoose.connect(connectionStr)

app.use(koaStatic(path.join(__dirname,'/public')))
//中间件，根据是否为生产环境判断是否返回stack信息
app.use(error({
    postFormat:(err,{stack, ...rest})=>{
        return process.env.NODE_ENV === 'production'?{...rest}:{stack, ...rest}
    }
}))
// app.use(async (ctx, next)=>{
//     try{
//         await next()
//     }catch(err){
//         ctx.status = err.status || err.message || 500
//         ctx.body = {
//             message: err.message
//         }
//     }
// })
app.use(koaBody({
    multipart:true,
    formidable:{
        uploadDir:path.join(__dirname, '/public/uploads'),
        keepExtensions:true
    }
}))
app.use(parameter(app))
routing(app)

app.listen(3000)