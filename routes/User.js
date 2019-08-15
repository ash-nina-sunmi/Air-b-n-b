const express= require("express");
const userSchema = require("../models/User");
const mongoose = require("mongoose");
const router= express.Router();
const bcrypt = require('bcryptjs');
const hasAccess = require("../middleware/auth");


//This creates a model in our application called user. A model is a representation of a collection
const User = mongoose.model('Users', userSchema);
// const Host = mongoose.model('Rooms', hostSchema);



router.get("/login",(req,res)=>
{ 
  res.redirect("/");

});

router.get("/register",(req,res)=>
{ 
  // const hostData=
  // {
  //   user_id :'',
  //   title: 'My ROOM IS THE BEST',
  //   image_1 : 'lalalal',
  //   image_2 : 'efgerg',
  //   image_3 : 'dfgfh',
  //   image_4 : 'rgdfgd',
  //   image_5 : 'gdfghdg',
  //   details : 'dfgdfhd',
  //   price   : 3000,
  //   guests  : 5,
  //   bed : 2,
  //   bath : 1
  // }

  // new Host(hostData)
  // .save()
  // .then( ()=>
  // {

  //   console.log('Room DB Created!');
  // })
  // .catch( (err)=>
  // {
  //   console.log(`Error ${err}`)
  // });
    res.render("User/register");

});

router.post("/register", (req,res)=>
{
    const errors= [];

    //validate


    if(req.body.emailaddress==="")
    {
      errors.push("You must enter a valid email address");
    }
    if(req.body.firstName==="")
    {
      errors.push("You must enter a first name");
    }
    if(req.body.lastName==="")
    {
      errors.push("You must enter a last name");
    }


    if(req.body.username==="")
    {
      errors.push("You must enter a username");
    }

    if(req.body.password==="")
    {
      errors.push("You must enter a password");
    }

    if(req.body.cpassword==="")
    {
      errors.push("You must enter confirm");
    }

    if(req.body.password!=="" && req.body.cpassword!=="")
    {
        if(req.body.password!= req.body.cpassword)
        {
          errors.push("The password and confirm was not equal");

        }
    }

    //THE IF MEANS THAT AN ERROR(S) OCCURED, THUS SHOW ERORS
    if(errors.length > 0)
    {

          res.render("User/register",{
            errors:errors,
            firstName: req.body.firstName,
            lastName : req.body.lastName,
            username : req.body.username,
            emailaddress : req.body.emailaddress
          });
    }

   
    else
    {



        const userData=
        {
          firstName :req.body.firstName,
          lastName: req.body.lastName,
          username : req.body.username ,
          password : req.body.password,
          email : req.body.emailaddress
        }



        //The genSalt function is used to generate random Text that will then be added to your password. Then that new, edited password will be hash
        bcrypt.genSalt(10, function(err, salt) 
        {
          bcrypt.hash(userData.password, salt, function(err, hash) 
          {
          
            userData.password= hash;

            new User(userData)
            .save()
            .then( ()=>
            {

              res.redirect("/");
            })
            .catch( (err)=>
            {
              console.log(`Error ${err}`)
            });


          });
        });


    

    }




     router.post("/login",(req,res)=>{

     const errors= [];

    //validate


    if(req.body.username==="")
    {
      errors.push("You must enter a username");
    }

    if(req.body.password==="")
    {
      errors.push("You must enter a last name");
    }


      //THE IF MEANS THAT AN ERROR(S) OCCURED, THUS SHOW ERORS
    if(errors.length > 0)
    {

        res.render("General/home",{
          errors:errors,
          username: req.body.username
         
        });

    }
    else
    {
          User.findOne({username:req.body.username})
          .then(user=>{

              //user!=null, means that an actual user object was returned 
              if(user!=null)
              {
                  // Load hash from your password DB.
                  bcrypt.compare(req.body.password, user.password, function(err, isMatched) {
                  // res === true

                  //if isMatched has a true value, that means that the user's password was matched with the has one stored in the db
                  if(isMatched==true)
                  {
                      req.session.userInfo = user;
                      // console.log(req.session.userInfo.firstName);
                      res.redirect("/")
                  }

                  //This means that the user did not enter the correct password,thus , we need to display an error message and render the home view
                  else

                  {
                      res.render("General/home",{
                      errors:errors,
                      username: req.body.username

                      });
                  }


                });



              }

              //The else represents that the username was not found in the db
              else
              {
                errors.push("Sorry username does not exists in db");

              res.render("General/home",{
              errors:errors
         
        });
                


              }



          })






    }





 })






});

router.post("/login",(req,res)=>{

  const errors= [];

 //validate


 if(req.body.username==="")
 {
   errors.push("You must enter a username");
 }

 if(req.body.password==="")
 {
   errors.push("You must enter a last name");
 }


   //THE IF MEANS THAT AN ERROR(S) OCCURED, THUS SHOW ERORS
 if(errors.length > 0)
 {

     res.render("User/login",{
       errors:errors,
       username: req.body.username
      
     });

 }
 else
 {
       User.findOne({username:req.body.username})
       .then(user=>{

           //user!=null, means that an actual user object was returned 
           if(user!=null)
           {
               // Load hash from your password DB.
               bcrypt.compare(req.body.password, user.password, function(err, isMatched) {
               // res === true

               //if isMatched has a true value, that means that the user's password was matched with the has one stored in the db
               if(isMatched==true)
               {
                   req.session.userInfo = user;
                   console.log("User is logged in")
                   res.redirect("/")
               }

               //This means that the user did not enter the correct password,thus , we need to display an error message and render the home view
               else

               {

                   errors.push("YOu entered the incorrect password");
                   res.render("User/login",{
                   errors:errors,
                   username: req.body.username

                   });
               }


             });



           }

           //The else represents that the username was not found in the db
           else
           {
             errors.push("Sorry username does not exists in db");

           res.render("User/login",{
           errors:errors
      
           });

           console.log("no user name")
             


           }

       })

 }

});

router.post("/logout",(req,res)=>
{

  //This kills the session
    req.session.destroy();
    res.redirect("/");

});

router.get("/userprofile",hasAccess,(req,res)=>
{ 
  res.render("User/userprofile");

});

router.put("/edit/email/:id",hasAccess,(req,res)=>
{ 
  User.findOne({_id:req.params.id})
   .then(useEeer=>
   {
    useEeer.email=req.body.emailaddress;
        // task.taskName=req.body.taskName;
        // task.taskDescription=req.body.taskDescription
        useEeer.save()
        .then(task=>{
          console.log("Profile Email Has Been Successfully Updated");
          // res.redirect("/task/tasks");
        })
   })
});

router.put("/edit/phone/:id",hasAccess,(req,res)=>
{ 
  User.findOne({_id:req.params.id})
   .then(useEeer=>
   {
    useEeer.phone=req.body.phonenumber;
        // task.taskName=req.body.taskName;
        // task.taskDescription=req.body.taskDescription
        useEeer.save()
        .then(task=>{
          console.log("Profile Phone Number Has Been Successfully Updated");
          // res.redirect("/task/tasks");
        })
   })
});






module.exports=router;