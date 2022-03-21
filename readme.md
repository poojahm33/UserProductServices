Nodejs User Service API 

User Home page : localhost:7000/api/users/
Product Home Page: localhost:7000/api/products/




GET method
------------------------------------------------------

Lists all the documents in the specified collection
POSTMAN- localhost:7000/api/users/

POST method
-------------------------------------------------------

adding new document to the collection

POSTMAN- localhost:7000/api/users/
body - {
    "username" : "lll",
    "password" : "pooja",
    "phoneno" : "2222222",
    "email": "jeetau@gmail.com",
    "address" : "sirsi",
    "pincode" : "786977"
}

GET method based on the User name
-----------------------------------------------------------
fetches user details based on the username '

POSTMAN- localhost:7000/api/users/jitesh M



Node js Product Service API
GET method
------------------------------------------------------

Lists all the documents in the specified collection
POSTMAN- localhost:7000/api/users/

POST method
-------------------------------------------------------

adding new document to the collection

POSTMAN- localhost:7000/api/products/
body -{
    "productname" : "Pooja H M",
    "price" : 800,
    "skucode" : "222",
    "modelno" : "pi877",
    "deliverycharges" : 200,
    "description" : "kumta",
    "stock" : true
}


GET method based on the Product SKU code
-----------------------------------------------------------
fetches user details based on the skucode'

POSTMAN- localhost:7000/api/products/222


Pagination
--------------------------------
localhost:7000/api/users?page=1
localhost:7000/api/products?page=1


Adding new users/Products
----------------------------------------------------
http://127.0.0.1:7000/api/addnewproduct
http://127.0.0.1:7000/api/addnewuser