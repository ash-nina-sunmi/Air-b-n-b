 /*
Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
 */
 
 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

  const userSchema = new Schema(
    {
      firstName: 
      { 
        type:String,
        required:false 
      },
      lastName: 
      { 
        type:String,
        required:false 

      },

      username: 
      { 
        type:String,
        required:true 

      },

      email: 
      { 
        type:String,
        required:true 

      },
      
      password: 
      { 
        type:String,
      required:true 

      },
      
      phone: 
      { 
        type:String,
      required:false 

      }
 
  });

  module.exports=userSchema;