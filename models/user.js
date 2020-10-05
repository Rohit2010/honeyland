var mongoose = require('mongoose');
var Schema = mongoose.Schema;


  const userSchema = new Schema({
      agentName:{
          type:String,
      },
      name: {
         type: String,
         required:true,
      },
      email: {
        type: String,
        required:true,
        trim:true
      },
      number: {
          type:Number,
          required:true,
          trim:true
      },
      address:{
            type:String,
            required:true
      },
      remark:{
        type:String,
        default:"no remark"
      },
      status:{
            type:String,
            default:"Application"
      },
      occupation:{
          type:String,
          required:true,
      },
      city:{
          type:String,
          required:true,  
      },
      district:{
          type:String,
          required:true,  
      },
      loanType:{
            type:String,
            required:true
      },
      photo:{
          type:String,
          default:"no photo"
      },
      familyIncome: {
        name:{
            type:String,
        },
        relation:{
            type:String,
        },
        occupation:{
            type:String,
        },
        income:{
            type:Number,
        }
    },
      
      familyIncomeb: {
        name:{
            type:String,
        },
        relation:{
            type:String,
        },
        occupation:{
            type:String,
        },
        income:{
            type:Number,
        }
      },
      familyIncomec: {
        name:{
            type:String,
        },
        relation:{
            type:String,
        },
        occupation:{
            type:String,
        },
        income:{
            type:Number,
        }
      },
      familyIncomed: {
        name:{
            type:String,
        },
        relation:{
            type:String,
        },
        occupation:{
            type:String,
        },
        income:{
            type:Number,
        }
      }


  })

  module.exports = mongoose.model("User" , userSchema)