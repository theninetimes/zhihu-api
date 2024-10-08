const mongoose = require('mongoose')

const { Schema, model } = mongoose
const usersSchema = new Schema({
    name:{ type: String , required: true},
    password:{ type: String , required: true, select: false},
    __v:{ type:Number, select:false},
    avatar_url:{type:String},
    gender:{ type:String, enum:['male','female'], default:'male', required:true},
    headline:{type:String, select:true},
    locations:{type:[{type:String}], select:false},
    business:{type:String, select:false},
    employments:{
        type:[{
            company:{type:String},
            job:{type:String}
        }],
        select:true
    },
    educations:{
        type:[{
            school:{type:String},
            major:{type:String},
            diploma:{type:Number,enum:[1,2,3,4,5]},
            entrance_year:{type:Number},
            graduate_year:{type:Number}
        }],
        select:true
    }, 
    following:{
        type:[{type:Schema.Types.ObjectId, ref:'users'}],
        select:false
    }
})

module.exports = model('users', usersSchema)