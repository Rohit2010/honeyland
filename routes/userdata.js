var express = require("express");
const requireLogin = require("../middleware/requireLogin");
var router = express.Router();
const User = require("../models/user")
const accountSid = 'ACfcfbbdb92f711e6de7cca317dc29fde9';
const authToken = '3120398d9b856b6296c7fd38197c029a';
const client = require('twilio')(accountSid, authToken);
const _ = require("lodash");
const fs = require("fs");

router.post("/userdata", (req, res) => {

    // const user = new User(req.body);
    // console.log(req.body)
    // user.save().then((user) => {
    //         client.messages
    //             .create({
    //                 body: 'thank you',
    //                 from: '+12017205829',
    //                 to: `+91${req.body.number}`
    //             })
    //             .then(message => console.log(message.sid));
    //         res.json({
    //             name: user.name,
    //             email: user.email
    //         })

    //     })
    //     .catch((err) => {
    //         return res.json({
    //             msg: "failed to upload data",
    //             error: err
    //         })
    //     })
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "problem with image"
            })
        }


        //destructure the fields
        const { name, email, number, address, occupation, city, district, loanType } = fields;

        if (!name || !email || !number || !address || !occupation || !city || !district || !loanType) {
            return res.json({
                error: "All fields are required"
            })

        }

        let user = new User(fields)

        //handle file here
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "picture is so big"
                })
            }
            user.photo.data = fs.readFileSync(file.photo.path);
            user.photo.contentType = file.photo.type;
        }
        //save to the db
        user.save((err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "saving user in db is failed"
                })
            }
            res.json(user)
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