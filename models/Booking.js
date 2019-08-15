 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

  const bookingSchema = new Schema(
    {
      customer_ID: 
      { 
        type:String,
        required:true 
      },
      listing_ID: 
      { 
        type:String,
        required:true 

      },
      bookingcreationdate: 
      {
        type:String,
        required:true
      },
      bookingstartdate: 
      {
        type:String,
        required:true
      },
      bookingenddate: 
      {
        type:String,
        required:true
      }
 
  });

  module.exports=bookingSchema;