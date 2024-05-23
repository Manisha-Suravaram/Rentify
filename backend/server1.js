const express = require('express');
const cors = require('cors');
const connection = require('./Connection')
const col_users = require('./databases/login');
const col_properties = require('./databases/property');

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.post('/signup',(req,res) => {
    console.log(req.body)
    col_users.insertMany({
        firstname:req.body.fname,
        lastname:req.body.lname,
        email:req.body.email,
        mobile:req.body.phone, 
        role:req.body.role,
        password:req.body.pwd
    }).then((res1) => {
        if(res1.length != 0){
            res.send({valid:true})
        }  
        else{
            res.send({valid:false})
        } 
    })
}) 

app.post('/login',(req,res) => {
    console.log(req.body);
    col_users.find({
        email: req.body.uname,
        password: req.body.pwd
    })
    .then(res2 => {
        console.log(res2);
        if(res2.length !== 0){
            res.send({role:res2[0].role,mail:res2[0].email,valid:true})
        }else{
            res.send({role:"invalid",valid:false})
        }
    })
    .catch(err => {
        console.log(err);
    })
})


module.exports = app 