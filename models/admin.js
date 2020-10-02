var mongoose = require('mongoose');
var Schema = mongoose.Schema;


  const adminSchema = new Schema({
      name: {
         type: String,
         required:true,
      },
      city: {
         type: String,
         required:true,
      },
      role:{
        type:Number,
        default:1
      },
      email: {
        type: String,
        required:true,
        trim:true,
        
      },
      password: {
        type: String,
        required:true,
        trim:true
      },
     


  })

  module.exports = mongoose.model("Admin" , adminSchema)