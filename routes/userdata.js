var express = require("express");
const requireLogin = require("../middleware/requireLogin");
var router = express.Router();
const User = require("../models/user")
const accountSid = 'AC6abc8b568c581f0a01e31c40994d39eb';
const authToken = 'd9157c2b0e9422f9025f9f6121f60df1';
const client = require('twilio')(accountSid, authToken);
const _ = require("lodash");
const fs = require("fs");
const nodemailer = require("nodemailer");


router.post("/userdata", (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'servicehoneyland@gmail.com',
          pass: 'Honeyland123@'
        }
      });
      
      var mailOptions = {
        from: 'servicehoneyland@gmail.com',
        to: `${req.body.email}`,
        subject: 'Confirmation mail from honeyland',
        text: `Congratulation! 
        
        Your Application is Successfully Submitted. The team will call you soon for the next process.  
        
        Team Honeyland Housing`
      };

    const user = new User(req.body);
    console.log(req.body)
    user.save().then((user) => {
            client.messages
                .create({
                    body: "Congratulation!  Your Application is Successfully Submitted. The team will call you soon for the next process.  Team Honeyland Housing",
                    from: '+91 78294 99927',
                    to: `+91${req.body.number}`
                })
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  })
                .then(message => console.log(message.sid));
            res.json({
                name: user.name,
                email: user.email
            })

        })
        .catch((err) => {
            return res.json({
                msg: "failed to upload data",
                error: err
            })
        })
})


router.get("/getdata", (req, res) => {
    User.find()
        .then((user) => {
            return res.json(user)
        })
        .catch(err => console.log(err))
})
router.get('/user/:id', (req, res) => {
    User.findById({ _id: req.params.id }, (err, user) => {
        if (err) {
            res.status(422).json(err)
        }
        res.json(user)
    })

})
router.put('/user/update/:id', (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false }, function(err, user) {
        if (err) {
            res.status(422).json({ error: "update failed" })
        }
        res.json(user)
    });
})

module.exports = router;