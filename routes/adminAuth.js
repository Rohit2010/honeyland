var express = require("express");
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require("../models/admin");
const JWT_SECRET = "kjbjhjh"
router.post('/signup', (req,res) => {
    const {email,name,city,password} = req.body;
console.log(req.body)
    if (!name || !email || !city || !password) {
        res.status(422).json({error:"Please add all the fields"})
    }
    Admin.findOne({email:email})
    .then((savedadmin) => {
        if (savedadmin) {
            res.status(422).json({error:"admin already exists"})
        }
    })
    bcrypt.hash(password,12)
    .then((hashpassword) => {
        const admin = new Admin({
            name,
            email,
            password:hashpassword,
            city
        })
        admin.save()
        .then(admin =>{
            return res.status(200).json(admin)
        })
        .catch(err => console.log(err))
    })
}) 
router.post('/signin',(req,res)=>{
    const {email,password,role} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    Admin.findOne({email:email})
    .then(savedadmin=>{
        if(!savedadmin){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedadmin.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
               const token = jwt.sign({_id:savedadmin._id},JWT_SECRET)
               const {_id,name,email,city,role} = savedadmin
               res.json({token,user:{_id,name,role,email,city}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})


module.exports = router;