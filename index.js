const express = require("express");
require("dotenv").config();
const app = express()
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userdata = require("./routes/userdata")
const adminAuth = require("./routes/adminAuth")
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
//db connection
mongoose.connect(process.env.DATABASE, 
    {       useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(()=> {
    console.log("DB CONNECTED")
    
}).catch((err) => console.log(err))

app.use(cookieParser());
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.get('/', (req, res) => res.send('Hello World!'))
app.use("/",userdata)
app.use("/",adminAuth)

app.listen(PORT, () => console.log(`app is running at ${PORT}`))