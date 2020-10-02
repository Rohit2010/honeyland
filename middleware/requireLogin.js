const jwt = require('jsonwebtoken')
const JWT_SECRET = "kjbjhjh"
const mongoose = require('mongoose')
const Admin = require("../models/admin")
module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    //authorization === Bearer ewefwegwrherhe
    if(!authorization){
       return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
         return   res.status(401).json({error:"you must be logged in"})
        }

        const {_id} = payload
        Admin.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
        
        
    })
}