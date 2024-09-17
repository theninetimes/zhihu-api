const jsonwebtoken = require('jsonwebtoken')
const Topic = require('../model/topics')
const { secret } = require('../config')

class TopicsCtl{
   async find(ctx){
    const {pre_page = 3} = ctx.query
    const page = Math.max(ctx.query.page*1, 1)-1//显示第几页
    const prePage = Math.max(pre_page, 1)//每页多少项
    const topic = await Topic
    .find({name:new RegExp(ctx.query.q)})
    .limit(prePage).skip(page*prePage)
    ctx.body = topic
   }
   async findById(ctx){
    const {fields = ''} = ctx.query
    const selectFields = fields.split(';').filter(f=>f).map(f=>'+'+f).join('')
    const topic = await Topic.findById(ctx.params.id).select(selectFields)
    ctx.body = topic
   }
   async create(ctx){
    ctx.verifyParams({
        name:{type:'string', required:true},
        avatar_url:{type:'string', required:false},
        description:{type:'string', required:false}
    })
    const topic = await new Topic(ctx.request.body).save()
    ctx.body = topic
   }

   async update(ctx){
    ctx.verifyParams({
        name:{type:'string', required:false},
        avatar_url:{type:'string', required:false},
        description:{type:'string', required:false}
    })
    const topic = await Topic.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    ctx.body = topic
   }
}

module.exports = new TopicsCtl()