const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 const hostSchema = new Schema(
    {
    user_id: 
    { 
    type:String,
    required:false 
    },
    location:
    {
    type:String,
    required:false 
    },
    title: 
    { 
    type:String,
    required:false 

    },
    image: 
    {
    type:Object,
    required:false
    },    
    details: 
    {
    type:String,
    required:false
    },
    price: 
    {
    type:String,
    required:false
    },
    guests: 
    {
    type:String,
    required:false
    },
    bed: 
    {
    type:String,
    required:false
    },
    bath: 
    {
    type:String,
    required:false
    },
    availablestartdate: 
    {
    type:String,
    required:false
    },
    availableenddate: 
    {
    type:String,
    required:false
    },
    hoster_email: 
    {
    type:String,
    required:false
    }


 });

 module.exports=hostSchema;