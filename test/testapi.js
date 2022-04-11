let chai = require('chai');

let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

const { expect } = require('chai');
chai.use(chaiHttp);

const {User} = require('../models/mongoschema');
const {Product} = require('../models/mongoschema');

//sample
describe("user service unit tests", function(){
    describe("save user functionality", function(){
   it("save the user successfully", async function(){
       
   });
    });
});

//get all user details
describe('/GET users ', () =>{
    it('it should get all the users', (done) =>{
        chai.request('http://localhost:7000')
        .get('/api/users')
        .end((err, res) => {
           res.should.have.status(200);
           res.body.should.be.a('Object');
         
            done();
        });
    });
});

// Post new User
describe('/POST users ', () =>{
    // it('it should not POST user without username', (done) =>{
    //     const email = 'poo@gmail.com',
    //     password = "$2a$10$E9NW6fRwfoMcBG3aatd63u4ql1nVBxwcE5NInkaAZgE/JP9E25lFS",
    //     phoneno = 87886655,
    //     address = 'kumta',
    //     pincode = 8798
    //     let sample = {
           
    //         password: password,
    //          email: email,
    //          phoneno: phoneno,
    //          address: address,
    //          pincode: pincode
    //     }
    //     chai.request('http://localhost:7000')
    //     .post('/api/users')
    //     .send(sample)
    //     .end((err, res) => {
    //         expect(sample).to.have.a.property('username');
    //         done();
    //     });
    // });
    it('it should  POST user ', (done) =>{
      const email = 'poo@gmail.com',
      password = "$2a$10$E9NW6fRwfoMcBG3aatd63u4ql1nVBxwcE5NInkaAZgE/JP9E25lFS",
      username = 'poo',
      phoneno = 87886655,
      address = 'kumta',
      pincode = 8798
        let user = {
           username: username,
           password: password,
            email: email,
            phoneno: phoneno,
            address: address,
            pincode: pincode
        }
        chai.request('http://localhost:7000')
        .post('/api/testusers')
        .buffer(true)
        .send(user)
        .end((err, res) => {
          
            res.should.have.status(200);
            res.body.should.be.a('Object');
          
            res.body.should.have.property('username');
            res.body.should.have.property('password');
            res.body.should.have.property('phoneno');

            res.body.should.have.property('email');
            res.body.should.have.property('address');
            res.body.should.have.property('pincode');
         
            done();
        });
    });
    afterEach(async () => {
        const dataa =   await User.deleteOne({ username : "poo"});
       
       });

});

describe('/GET users/:username ', () =>{
    it('it should get the user by the given username', (done) =>{
        const username = "pooja";
        chai.request('http://localhost:7000')
        .get('/api/testusers/'+ username)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');
          res.body.should.have.property('username');
          res.body.should.have.property('phoneno');
          res.body.should.have.property('email');
          res.body.should.have.property('address');
          res.body.should.have.property('pincode');
          res.body.should.have.property('username').eql(username);
            done();
        });
    });
});

//get product details based on skucode
describe('/GET Products/:skucode ', () =>{
    it('it should get the products by the given skucode', (done) =>{
        const skucode = "222";
        chai.request('http://localhost:7000')
        .get('/api/testproducts/'+ skucode)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');
          res.body.should.have.property('productname');
          res.body.should.have.property('skucode');
          res.body.should.have.property('modelno');
          res.body.should.have.property('price');
          res.body.should.have.property('description');
          res.body.should.have.property('deliverycharges');
          res.body.should.have.property('stock');
          res.body.should.have.property('skucode').eql(skucode);
            done();
        });
    });
});

//post new product
describe('/POST Products ', () =>{
    it('it should  POST products', (done) =>{
        const productname = 'UPS',
        modelno = "tt333",
        price = 8788,
        description = 'kumta',
        deliverycharges = 8798,
        skucode = "yaq",
        stock = true
        let sample = {
            productname:productname,
            modelno: modelno,
            price: price,
            description: description,
            deliverycharges: deliverycharges,
            skucode: skucode,
            stock :stock
        }
        chai.request('http://localhost:7000')
        .post('/api/testproducts')
        .send(sample)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('Object');
            res.body.should.have.property('productname');
            res.body.should.have.property('skucode');
            res.body.should.have.property('modelno');
            res.body.should.have.property('price');
            res.body.should.have.property('description');
            res.body.should.have.property('deliverycharges');
            res.body.should.have.property('stock');
            done();
        });
    });

    afterEach(async () => {
     const dataa =   await Product.deleteOne({ skucode : "yaq"});
    
    })
});
