var mongoose = require('mongoose');
var Schema = mongoose.Schema;


  const searchSchema = new Schema({
      search: {
         type: Number,
         required:true,
      },
    
  })

  module.exports = mongoose.model("Search" , searchSchema)