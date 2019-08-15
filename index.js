const express= require("express");
const exphbs=require("express-handlebars");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
var options = {
    auth: {
        api_key: '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'
    }
}

const url="mongodb+srv://heroku:2OfvSfGwp6FKvx8R@air-b-and-b-g5wry.gcp.mongodb.net/test?retryWrites=true&w=majority";

// const url="mongodb://localhost:27017/Air-B&B";

//This line conntects mongoose to our mongoDB database
mongoose.connect(url, {useNewUrlParser: true})
.then( ()=>
{
  console.log(`The application is connected to the mongo db databse`)
})
.catch( (err)=>
{
    console.log(`The mongo db failed to connect because ${err}`);
});


//import routes
const generalRoute = require("./routes/General");
const userRoute = require("./routes/User");
const taskRoute = require("./routes/Task");
const hostRoute = require("./routes/Host");


//this creates the express object. THIS OBJECT
const app = express();

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());


// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))


//This forces express to set handlebars as it's template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


//This code is needed to load all static files (images,css,js)
app.use(express.static('public'))


app.use((req,res,next)=>
{
    res.locals.userInfo= req.session.userInfo;
    res.locals.hostInfo= req.session.hostInfo;
    res.locals.errorInfo= req.session.errorInfo;


    next();


});

//This loads all your route modules
app.use("/",generalRoute);

app.use("/user",userRoute);

app.use("/task",taskRoute);

app.use("/host",hostRoute);


const mailer = nodemailer.createTransport(sgTransport(options));

// const port=3000;
const port=process.env.PORT || 5000;
app.listen(port, ()=>{

    console.log(`The web server is connected!!`);
});