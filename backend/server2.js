const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const connection = require('./Connection')
const col_users = require('./databases/login');
const col_properties = require('./databases/property');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const sendmail = ({property,user,r_mail,b_or_s}) => {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rentifynotes@gmail.com',
            pass: 'clccryukzsrgwzme'
        },
        tls: {
            rejectUnauthorized: false
        },
    });

    const mailOptions = {
        from: 'rentifynotes@gmail.com',
        to: r_mail,
        subject: `Property and ${b_or_s} Details`,
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Property and Buyer Details</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .container {
                        width: 100%;
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h2 {
                        color: #333333;
                    }
                    .details {
                        margin-bottom: 20px;
                    }
                    .details p {
                        margin: 5px 0;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        color: #777777;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Property Details</h2>
                    <div class="details">
                        <p><strong>Address:</strong> ${property.name}</p>
                        <p><strong>Price:</strong> ${property.money}</p>
                        <p><strong>Location:</strong> ${property.area} , ${property.location}</p>
                        <p><strong>Bedrooms:</strong> ${property.bathroom}</p>
                        <p><strong>Bathrooms:</strong> ${property.bathroom}</p>
                    </div>
                    <h2>${b_or_s} Details</h2>
                    <div class="details">
                        <p><strong>Name:</strong> ${user.firstname} ${user.lastname}</p>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>Phone:</strong> ${user.mobile}</p>
                    </div>
                    <div class="footer">
                        <p>Thank you for choosing our services.</p>
                    </div>
                </div>
            </body>
            </html>

        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


app.post('/properties',(req,res) =>{
    const owner = req.body?.owner;
    console.log(owner)
    let payload = {}
    if(owner !== undefined){
        payload.owner = owner
    }
    console.log(payload)
    col_properties.find(payload)
    .then(properties =>{
        res.json(properties)        
    })
    .catch(err =>{
        console.log(err);
    })
})


app.post('/like',(req,res) =>{
    const id = req.body.id;
    col_properties.find({_id: id})
    .then(property =>{
        let likes = property[0].likes
        let likedBy = property[0].likedBy
        if (likedBy.includes(req.body.mail)) return;
        likedBy.push(req.body.mail)
        likes += 1
        col_properties.updateOne({_id: id},{likes: likes,likedBy: likedBy})
        .then(() =>{
            col_properties.find({})
            .then(properties =>{
                res.json(properties)        
            })
            .catch(err =>{
                console.log(err);
            })
        })
        .catch(err =>{
            console.log(err)
        })
    })
    .catch(err =>{
        console.log(err)
    })
})

app.post('/getproperty',(req,res) =>{
    const id = req.body.id;
    const buyer_mail = req.body.mail;
    console.log(buyer_mail)
    col_properties.find({_id: id})
    .then(property =>{
        const owner = property[0].owner;
        col_users.find({email: [owner,buyer_mail]})
        .then(user =>{
            sendmail({property: property[0],user: user[0],r_mail: buyer_mail,b_or_s: 'Seller'})
            sendmail({property: property[0],user: user[1],r_mail: owner,b_or_s: 'Buyer'})
            res.send({property: property,user: user[0]})        
        })
        .catch(err =>{
            console.log(err);
        })
    })
    .catch(err =>{
        console.log(err);
    })   
})


app.post('/delete',(req,res) =>{
    const id = req.body.id;
    col_properties.deleteOne({_id: id})
    .then(() =>{
        res.send('deleted')
    })
    .catch(err =>{
        console.log(err);
    })
})

app.post('/addproperties',(req,res) =>{
    const owner = req.body.owner;
    const place = req.body.place;
    const area = req.body.area;
    const nob = req.body.nob;
    const bathroom = req.body.bathroom;
    const hospitals = req.body.hospitals;
    const colleges = req.body.colleges;
    const money = req.body.money;
    const name = req.body.name;

    const property = new col_properties({
        owner: owner,
        place: place,
        area: area,
        nob: nob,
        bathroom: bathroom,
        hospitals: hospitals,
        colleges: colleges,
        money: money,
        name: name
    });

    property.save()
    .then(() =>{
        res.send('Property Added')
    })
    .catch(err =>{
        console.log(err);
    })
})

app.post('/editproperty',(req,res) =>{
    const id = req.body.id;
    const owner = req.body.formData.owner;
    const place = req.body.formData.place;
    const area = req.body.formData.area;
    const nob = req.body.formData.nob;
    const bathroom = req.body.formData.bathroom;
    const hospitals = req.body.formData.hospitals;
    const colleges = req.body.formData.colleges;
    const money = req.body.formData.money;
    const name = req.body.formData.name;

    col_properties.updateOne({_id: id},{
        owner: owner,
        place: place,
        area: area,
        nob: nob,
        bathroom: bathroom,
        hospitals: hospitals,
        colleges: colleges,
        money: money,
        name: name
    })
    .then(() =>{
        res.send('Property Updated')
    })
    .catch(err =>{
        console.log(err);
    })
})



module.exports = app