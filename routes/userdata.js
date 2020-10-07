var express = require("express");
const requireLogin = require("../middleware/requireLogin");
var router = express.Router();
const User = require("../models/user")
const accountSid = 'AC6abc8b568c581f0a01e31c40994d39eb';
const authToken = '948b7f65ac32975271867a5d0ea75162';
const client = require('twilio')(accountSid, authToken);
router.post("/userdata", (req, res) => {

    const user = new User(req.body);
    console.log(req.body)
    user.save().then((user) => {
            client.messages
                .create({
                    body: 'Thank you for filling the form',
                    from: '+12017205829',
                    to: `+91${req.body.number}`
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