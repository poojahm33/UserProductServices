const express = require('express');
const router = express.Router();
const Bcrypt = require('bcryptjs');
const {User} = require('../models/mongoschema');
const {Product} = require('../models/mongoschema');


//add new users
router.get("/addnewuser",function(req,res){
    res.render("adduser");
});

//add new products
router.get("/addnewproduct",function(req,res){
    res.render("addproduct");
});



//post user details

router.post('/users',async(req,res)=>{
     req.body.password = Bcrypt.hashSync(req.body.password, 10);
    //console.log(req.body.password);
     const user = new User({
         username: req.body.username,
         password:req.body.password,
         phoneno: req.body.phoneno,
         email: req.body.email,
         address: req.body.address,
         pincode: req.body.pincode
     });
     try{
         const newUser = await user.save();
         //res.status(201).json({newUser});
        // const users = await User.find(); //excluding the password
         //res.json(users);
         var paginate = 2;
       // var page = pageNumber;
      
        var pageNumber = parseInt(req.query.page);
        if(req.query.page == undefined){
            pageNumber = 1;
        }
    //   console.log(pageNumber);
        const count = await User.countDocuments();
        const pages = Math.ceil(count / paginate);
        // console.log(count);
        const users = await User.find().skip((pageNumber-1)*paginate).limit(paginate); //excluding the password
        //res.json(users);
       //pagination
        res.render("home", {users: users,
        pages: pages});
     } catch (err){res.status(500).json({message:err.message});}
 
 });

 //get all user details
 router.get('/users',async(req,res)=>{

    
    try{
        var paginate = 2;
       // var page = pageNumber;
      
        var pageNumber = parseInt(req.query.page);
        if(req.query.page == undefined){
            pageNumber = 1;
        }
      // console.log(pageNumber);
        const count = await User.countDocuments();
        const pages = Math.ceil(count / paginate);
        // console.log(count);
        const users = await User.find().skip((pageNumber-1)*paginate).limit(paginate); //excluding the password
        //res.json(users);
       //pagination
    
       res.render("home", {users: users,
    pages : pages});
      
    } catch(err){res.status(400).json({message:err.message});}
});

//get user details based on username
router.get('/users/:name',async(req,res)=>{
   
    try{
        const users = await User.find({username :req.params.name});
       
        res.render("userdetails", {users: users});
        
    } catch(err){res.status(400).json({message:err.message});}
});


//post product details
router.post('/products',async(req,res)=>{
    const product = new Product({
        productname: req.body.productname,
        price:req.body.price,
        skucode: req.body.skucode,
        modelno: req.body.modelno,
        deliverycharges: req.body.deliverycharges,
        description: req.body.description,
        stock: req.body.stock
    });
    try{
        const newProduct = await product.save();
      //  res.status(201).json({newProduct});
      var paginate = 2;
      // var page = pageNumber;
       var pageNumber = parseInt(req.query.page);
       if(req.query.page == undefined){
          pageNumber = 1;
      }
       const count = await Product.countDocuments();
       const pages = Math.ceil(count / paginate);
      const products = await Product.find().skip((pageNumber-1)*paginate).limit(paginate);
      //res.json(products);
      res.render("producthome", {products: products,
      pages : pages});
    } catch (err){res.status(500).json({message:err.message});}

});

//get all product details
router.get('/products',async(req,res)=>{
  
    try{
        var paginate = 2;
        // var page = pageNumber;
         var pageNumber = parseInt(req.query.page);
         if(req.query.page == undefined){
            pageNumber = 1;
        }
         const count = await Product.countDocuments();
         const pages = Math.ceil(count / paginate);
        const products = await Product.find().skip((pageNumber-1)*paginate).limit(paginate);
        //res.json(products);
        res.render("producthome", {products: products,
        pages : pages});
      
    } catch(err){res.status(400).json({message:err.message});}
});

//get product details based on skucode
router.get('/products/:skucode',async(req,res)=>{
   
    try{
        const products = await Product.find({skucode :req.params.skucode});
        res.render("productdetails", {products: products});
    } catch(err){res.status(400).json({message:err.message});}
});

//testing purpose
router.get('/testproducts/:skucode',async(req,res)=>{
   
    try{
        const products = await Product.findOne({skucode :req.params.skucode});
        res.json(products);
    } catch(err){res.status(400).json({message:err.message});}
});

router.get('/testusers/:name',async(req,res)=>{
   
    try{
        const users = await User.findOne({username :req.params.name});
       res.json(users);
    } catch(err){res.status(400).json({message:err.message});}
});

router.post('/testproducts',async(req,res)=>{
    const product = new Product({
        productname: req.body.productname,
        price:req.body.price,
        skucode: req.body.skucode,
        modelno: req.body.modelno,
        deliverycharges: req.body.deliverycharges,
        description: req.body.description,
        stock: req.body.stock
    });
    try{
        const newProduct = await product.save();
      //  res.status(201).json({newProduct});
     
      const products = await Product.find();
      res.json(newProduct);
   
    } catch (err){res.status(500).json({message:err.message});}

});

router.post('/testusers',async(req,res)=>{
    req.body.password = Bcrypt.hashSync(req.body.password, 10);
   //console.log(req.body.password);
    const user = new User({
        username: req.body.username,
        password:req.body.password,
        phoneno: req.body.phoneno,
        email: req.body.email,
        address: req.body.address,
        pincode: req.body.pincode
    });
    try{
        const newUser = await user.save();
        //res.status(201).json({newUser});
        const users = await User.find(); //excluding the password
        res.json(newUser);
    } catch (err){res.status(500).json({message:err.message});}

});



module.exports = router;
