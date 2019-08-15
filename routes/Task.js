const express= require("express");
const taskSchema = require("../models/Task");
const mongoose = require("mongoose");
const router= express.Router();
const hasAccess = require("../middleware/auth");

    //This creates a model in our application called user. A model is a representation of a collection
  const Task = mongoose.model('Tasks', taskSchema);



//This displays the Add Task form
router.get("/addTask",(req,res)=>
{ 
    res.render("Task/addTask");

});


//This processes the data after the task form has been submitted
router.post("/addTask",(req,res)=>
{ 


    const errors= [];

    //validate


    if(req.body.title==="")
    {
      errors.push("You must enter a title");
    }

    if(req.body.description==="")
    {
      errors.push("You must enter a last name");
    }

    
    //THERE IS ERROR(S)
    if(errors.length > 0)
    {

          res.render("Task/addTask",{
            errors:errors,
            title: req.body.title,
            description : req.body.description
          });
    }

    //NO ERRORS
    else
    {

  

        const taskData=
        {
          title :req.body.title,
          description: req.body.description

        }

        new Task(taskData)
        .save()
        .then( ()=>
        {
          
           res.redirect("/task/tasks");
        })
        .catch( (err)=>
        {
          console.log(`Error ${err}`)
        });

    }


});



//This navigates the user to the Task DashBoard
router.get("/tasks",(req,res)=>
{ 
   //Anytime you want to pull data from the DB, specifically a collection, you must called the find() method on the variable that re the Model
   Task.find()
   .then((tasks)=>
   {
        res.render("Task/taskList",{
          allTask:tasks

        })
   })
});



//This navigates the user to the Task Edit form with populated data
router.get("/edit/:id",(req,res)=>
{ 

   Task.findOne({ _id:req.params.id})
   .then((task)=>
   {
        res.render("Task/editForm",{
          task:task

        })
   })
});

router.put("/edit/:id",(req,res)=>
{ 

      Task.findOne({_id:req.params.id})
      .then(task=>
      {
         
         task.title=req.body.title;

         task.description=req.body.description

         task.save()
         .then(task=>{

            res.redirect("/task/tasks");
         })


      })
   
});


router.delete("/delete/:id",(req,res)=>{

      Task.remove({_id:req.params.id})
      .then(()=>{

        res.redirect("/task/tasks");

      });

})



module.exports=router;