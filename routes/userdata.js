var express = require("express");
const requireLogin = require("../middleware/requireLogin");
var router = express.Router();
const User = require("../models/user")
const accountSid = 'ACfcfbbdb92f711e6de7cca317dc29fde9';
const authToken = '79f85edec90d76ac73fddba8704f439b';
const client = require('twilio')(accountSid, authToken);
const _ = require("lodash");
const fs = require("fs");
const nodemailer = require("nodemailer");


router.post("/userdata", (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'prakaashrathod@gmail.com',
          pass: '46565000p'
        }
      });
      
      var mailOptions = {
        from: 'prakaashrathod@gmail.com',
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
                    body: 'thank you',
                    from: '+12017205829',
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