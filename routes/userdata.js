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
            name:user.name,
            email:user.email
        })

    })
        .catch((err) => {
            return res.json({ msg: "failed to upload data",
        error:err })
        })
})


router.get("/getdata",(req, res) => {
    User.find()
    .then((user) => {
        return res.json(user)
    })
    .catch(err => console.log(err))
})
// router.get("/search",(req, res) => {

//     const search = new Search(req.body)

//     User.findOne({number:res.body.number})
//     .then(user => {
//         console.log(user)
//     })
//     .catch(err => console.log(err))
// })

module.exports = router;