const path = require('path')

class HomeCtl{
    index(ctx){
        ctx.body = '<h1>Hello Koa2</h1>'
    }
    upload(ctx){
        const file = ctx.request.files.file
        const pathName = path.basename(file.path)
        ctx.body = {
            url:`${ctx.origin}/uploads/${pathName}`
        }
    }
}

module.exports = new HomeCtl()