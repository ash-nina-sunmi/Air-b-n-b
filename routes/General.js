const express= require("express");

const router= express.Router();


router.get("/",(req,res)=>
{ 


        res.render("General/home",{
            searchflag:"exist"

        });


    

});

// router.get("/addlisting",(req,res)=>
// { 
//     res.render("Host/addlisting");

// });

router.get("/contactUS",(req,res)=>
{ 
    res.send("This is my contact us page");

});

module.exports=router;