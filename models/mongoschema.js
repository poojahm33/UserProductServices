const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// user schema
const userSchema = new Schema({
 username:{
     type:String,
     required:true,
     unique:true
 },
 password:{
     type: String,
     required:true,
     select:false

 },
 phoneno:{
    type:String,
    required:true,
    unique:true
},
email:{
    type:String,
    required:true,
    unique:true
},
address:{
    type:String,
    required:true,
},
pincode:{
    type:String,
    required:true,
   
}

});

//product schema

const productSchema = new Schema({
    productname:{
        type:String,
        required:true,
    },
    price:{
       type:Number,
       required:true,
      
   },
   skucode:{
       type:String,
       required:true,
       unique:true
   },
   modelno:{
       type:String,
       required:true,
   },
   deliverycharges:{
       type:String,
       required:true,
   },
   description:{
    type:String,
   },
   stock:{
    type:Boolean,
    required:true,
}
});


const User = mongoose.model('userdetails', userSchema);

const Product = mongoose.model('productdetails', productSchema);

module.exports = { 
    User : User,
    Product : Product
};