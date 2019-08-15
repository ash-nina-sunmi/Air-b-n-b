const express= require("express");
const hostSchema = require("../models/Host");
const mongoose = require("mongoose");
const router= express.Router();
const bookingSchema = require("../models/Booking");
const hasAccess = require("../middleware/auth");
const multer = require('multer');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');


const Hoster = mongoose.model('Rooms', hostSchema);
const Booker = mongoose.model('Bookings', bookingSchema);
const options = {
  auth: {
      api_key: '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'
  }
};
iii = 1
arey = []
const Storage = multer.diskStorage({
  destination: function(req, file, callback) {
 

  callback(null, "./public/images/Rooms/");
  },
  filename: function(req, file, callback) {


    random = (Math.floor(Math.random() * 999999999999999999) + 1);
    callback(null, random + req.session.userInfo._id + "_" + iii + "." +file.originalname.substring(file.originalname.indexOf(".") + 1));
    arey.push(random + req.session.userInfo._id + "_" + iii + "." +file.originalname.substring(file.originalname.indexOf(".") + 1)); 
    req.session.userInfo.imageNamee = arey
if (iii > 5 ) {
  iii = 1
} else {
  iii++
}

  }
  });

  const upload = multer({
    storage: Storage
    }).array("imgUploader", 5); //Field name and max count

function notificationFunction() {
    console.log('Cant stop me now! (SENDING NOTIFICATIONS NOW LALALA');




    Booker.find({})
    .then(book=>{

        //user!=null, means that an actual user object was returned 
        if(book.length > 1)
        {
          const dsdfgsdff = new Date();
          const nananana = dsdfgsdff.getTime();
          book.forEach(function(element) {
if (element.bookingstartdate.getTime() - 86400000 <= nananana) {

// ACTIVATE THIS FOR REMINDERS

         const accountSid = 'ACbd001b6643a0b4825cbc10cf3c5075b1';
         const authToken = '7fb6c9a689d1f52eec423990883b2aa8';
         const client = require('twilio')(accountSid, authToken);
     
         client.messages
         .create({
         body: `Hi Ashkan, Tomorrow you have a booking don't forget`,
         from: '+16476945962',
         to: '+14168411575'
         })
         .then(message => console.log(message.sid))
         .catch(err=>console.log(`Error :${err}`));

      let mailer = nodemailer.createTransport(sgTransport(options));
      let email = {
        to: req.session.userInfo.email,
        from: 'roger@tacos.com',
        subject: 'Hi there',
        text: 'Wellcome to my world',
        html: '<b>Wellcome to my world</b>'
      };
      
      mailer.sendMail(email, function(err, res) {
        if (err) { 
            console.log(err) 
        }
        console.log(res);
      });
      sgMail.send(msg);
};


});

        }

        else
        {
 console.log("THERES SOMETHING WRONG WITH BOOKING DB")


        }

    })

    






    

  



  };
//   3600000
  setInterval(notificationFunction, 3600000);

  
router.get("/searchresult",(req,res)=>
{ 
    res.render("Host/searchresult");
});

router.get("/roomdetails",(req,res)=>
{ 
    // res.render("Host/roomdetails");
    res.redirect("/");

});

router.get("/roomdetails/:id",(req,res)=>
{ 

  Hoster.findOne({ _id:req.params.id})
   .then((selectedBooking)=>
   {
            res.render("Host/roomdetails",{
            selectedBooking:selectedBooking
        })
   })
});


router.post("/search",(req,res)=>
{ 
    const errors= [];

 //validate


 if(req.body.search==="")
 {
   errors.push("You must enter a location to search");
 }

 if(errors.length > 0)
 {

     res.render("General/home",{
       errors:errors,
       search: req.body.search,
       searchflag:"exist"

     });
    }
     else
     {
           Hoster.find({location:req.body.search})
           .then(loc=>{
    
               //user!=null, means that an actual user object was returned 
               if(loc.length >= 1)
               {
                req.session.hostInfo = loc;
                res.redirect("/Host/searchresult")
    
    
               }
    
               else
               {
                errors.push("YOu entered an incorrect place to search");
                res.render("General/home",{
                errors:errors,
                search: req.body.search,
                searchflag: "exist"

          
               });
    
                 
    
    
               }
    
           })
    
     }

    // res.render("Host/roomdetails");

});

router.get("/book",(req,res)=>
{ 
  res.render("Host/bookingconfirmation");

});

router.post("/book",hasAccess,(req,res)=>
{ 
//     const bookingData=
//     {
//     customer_ID : "req.body.firstName",
//     host_ID: "req.body.lastName",
//     bookingcreationdate: Date(),
//     bookingstartdate: new Date("<2017-01-01>"),
//     bookingenddate: new Date("<2018-01-01>")
//     }

//     new Booker(bookingData)
//     .save()
//     .then( ()=>
//     {

//       res.redirect("/");
//     })
//     .catch( (err)=>
//     {
//       console.log(`Error ${err}`)
//     });

// console.log("Booking created")
//     // res.render("Host/bookingconfirmation");

const errors= [];

    //validate


    if(req.body.startdatee==="")
    {
      errors.push("You must enter an start date");
    }
    if(req.body.enddatee==="")
    {
      errors.push("You must enter an end date");
    }
    if(errors.length > 0)
    {

          // res.render("Host/register",{
          //   errors:errors,
          //   firstName: req.body.firstName,
          //   lastName : req.body.lastName,
          //   username : req.body.username,
          //   emailaddress : req.body.emailaddress
          // });
          red.redirect("/")
    }

    else
    {
      Hoster.findOne({_id:req.body.listing_id})
          .then(roomer=>{

              //user!=null, means that an actual user object was returned 
              if(roomer!=null)
              {
                //   // Load hash from your password DB.
                //   bcrypt.compare(req.body.password, user.password, function(err, isMatched) {
                //   // res === true

                //   //if isMatched has a true value, that means that the user's password was matched with the has one stored in the db
                //   if(isMatched==true)
                //   {
                //       req.session.userInfo = user;
                //       // console.log(req.session.userInfo.firstName);
                //       res.redirect("/")
                //   }

                //   //This means that the user did not enter the correct password,thus , we need to display an error message and render the home view
                //   else

                //   {
                //       res.render("General/home",{
                //       errors:errors,
                //       username: req.body.username

                //       });
                //   }


                // });
                let userStartDate = new Date(req.body.startdatee); // some mock date
                let userEndDate = new Date(req.body.enddatee); // some mock date
                let trueUSD = userStartDate.getTime();
                let trueUED = userEndDate.getTime();
                let numberOfDays = (trueUED - trueUSD) / 86400000;
                let totalPrice = numberOfDays * roomer.price;



                    if (trueUSD > roomer.availablestartdate && trueUED < roomer.availableenddate) {
                      console.log("YOUR BOOKING MATCHES GZ")
                      res.render("Host/bookingconfirmation",{
                        selectedroom : roomer,
                        startDate : req.body.startdatee,
                        endDate : req.body.enddatee,
                        numberOfDays : numberOfDays,
                        totalPrice : totalPrice                        
                  });
                    }
                    else {
                      console.log("DATES WRONG MAN")
                    }






              }

              //The else represents that the username was not found in the db
              else
              {
                console.log("Sorry room does not exists in db")

              res.render("General/home",{
              // errors:errors
         
        });
                


              }



          })






    }






});

router.post("/addlisting",hasAccess,upload,(req,res)=>
{ 

 


  
  iii = 1

    errors = [];
    arey = []

    //validate

    if(typeof req.body.title === 'undefined')
    {
      errors.push("You must enter a Title");
    }
    if(typeof req.body.location === 'undefined')
    {
      errors.push("You must enter a Location");
    }
 
    

    if(typeof req.body.price === 'undefined')
    {
      errors.push("You must enter a price");
    }

    if(typeof req.body.guests === 'undefined')
    {
      errors.push("You must enter number of guests");
    }

    if(typeof req.body.bed === 'undefined')
    {
      errors.push("You must enter number of beds");
    }

    if(typeof req.body.bath === 'undefined')
    {
      errors.push("You must enter number of baths");
    }

    if(typeof req.body.details === 'undefined')
    {
      errors.push("You must enter details of your place");
    }
    //THE IF MEANS THAT AN ERROR(S) OCCURED, THUS SHOW ERORS
    if(errors.length > 0)
    {

      console.log("There are errors here");
      res.render("Host/addlisting",{
            errors:errors,
            title: req.body.title,
            location : req.body.location,
            price : req.body.price,
            guests : req.body.guests,
            bed: req.body.bed,
            bath : req.body.bath,
            details : req.body.details,
          });
    }

   
    else
    {

      let datess = new Date(req.body.sdate); // some mock date
      let dateee = new Date(req.body.edate); // some mock date
      let dates = datess.getTime();
      let datee = dateee.getTime();
      // var milliseconds = datef.getTime(); 

        const roomData=
        {
          title: req.body.title,
          location : req.body.location,
          price : req.body.price,
          guests : req.body.guests,
          bed: req.body.bed,
          bath : req.body.bath,
          details : req.body.details,
          image : req.session.userInfo.imageNamee,
          availablestartdate : dates,
          availableenddate : datee,
          user_id : req.session.userInfo._id,
          hoster_email : req.session.userInfo.email
        };

                    
            new Hoster(roomData)
            .save()
            .then( ()=>
            {
    //           this is to upload files
    //            upload(req, res, function(err) {
    // if (err) {
    // return res.end("Something went wrong!");
    // }
    // console.log("File uploaded successfully!.");
    // });


              res.redirect("/");
              console.log("Room registered successfully");
            })
            .catch( (err)=>
            {
              console.log(`Error ${err}`)
            });


         
        


    

    }




//      router.post("/login",(req,res)=>{

//      const errors= [];

//     //validate


//     if(req.body.username==="")
//     {
//       errors.push("You must enter a username");
//     }

//     if(req.body.password==="")
//     {
//       errors.push("You must enter a last name");
//     }


//       //THE IF MEANS THAT AN ERROR(S) OCCURED, THUS SHOW ERORS
//     if(errors.length > 0)
//     {

//         res.render("General/home",{
//           errors:errors,
//           username: req.body.username
         
//         });

//     }
//     else
//     {
//           User.findOne({username:req.body.username})
//           .then(user=>{

//               //user!=null, means that an actual user object was returned 
//               if(user!=null)
//               {
//                   // Load hash from your password DB.
//                   bcrypt.compare(req.body.password, user.password, function(err, isMatched) {
//                   // res === true

//                   //if isMatched has a true value, that means that the user's password was matched with the has one stored in the db
//                   if(isMatched==true)
//                   {
//                       req.session.userInfo = user;
//                       // console.log(req.session.userInfo.firstName);
//                       res.redirect("/")
//                   }

//                   //This means that the user did not enter the correct password,thus , we need to display an error message and render the home view
//                   else

//                   {
//                       res.render("General/home",{
//                       errors:errors,
//                       username: req.body.username

//                       });
//                   }


//                 });



//               }

//               //The else represents that the username was not found in the db
//               else
//               {
//                 errors.push("Sorry username does not exists in db");

//               res.render("General/home",{
//               errors:errors
         
//         });
                


//               }



//           })






//     }





//  })






},);

router.get("/addlisting",(req,res)=>
{ 
    // res.render("Host/roomdetails");
    res.render("Host/addlisting");

});

router.post("/confirmbooking",hasAccess,(req,res)=>
{
  let userStartDate1 = new Date(req.body.startdatee1); // some mock date
  let userEndDate1 = new Date(req.body.enddatee1); // some mock date
  let trueUSD1 = userStartDate1.getTime();
  let trueUED1 = userEndDate1.getTime();


  const bookingData1=
     {
    customer_ID : req.session.userInfo._id,
    listing_ID: req.body.listing_id1,
    bookingcreationdate: Date(),
    bookingstartdate: trueUSD1,
    bookingenddate: trueUED1
    };

    new Booker(bookingData1)
    .save()
    .then( ()=>
    {


      function sendEmailToRenter() {
  
        let mailer1 = nodemailer.createTransport(sgTransport(options));
        let email1 = {
          to: req.session.userInfo.email,
          from: 'roger@tacos.com',
          subject: 'Hi there this is your booking confirmation',
          text: 'Hi there this is your booking confirmation',
          html: '<b>Hi there this is your booking confirmation</b>'
        };
        
        mailer1.sendMail(email1, function(err, res) {
          if (err) { 
              console.log(err) 
          }
          console.log(res);
        });
      };

      function sendEmailToHoster() {

        let mailer12 = nodemailer.createTransport(sgTransport(options));
        let email12 = {
          to: req.body.hosteremail1,
          from: 'roger@tacos.com',
          subject: 'Hi there this is your booking confirmation',
          text: 'Hi there this is your booking confirmation',
          html: '<b>Hi there this is your booking confirmation</b>'
        };
        
        mailer12.sendMail(email12, function(err, res) {
          if (err) { 
              console.log(err) 
          }
          console.log(res);
        });




      };



      sendEmailToHoster()
      sendEmailToRenter()
      console.log("Booking registered GJ")
      res.redirect("/");
    })
    .catch( (err)=>
    {

      console.log(`Error ${err}`)
    });


});


module.exports=router;
