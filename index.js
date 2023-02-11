const exp = require('constants');
const express = require('express');
const path= require('path');
const port =8000;
const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app= express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList=[
    {
        name: "jeet",
        phone:"1111111"
    }
]

app.post('/create_contact',function(req,res){
    // contactList.push(req.body);
    // return res.redirect('back');
    Contact.create({
        name: req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){console.log('error i creating new contact');return;}
        //console.log('*******',newContact);
        res.redirect('back');
});
});


app.get('/',function(req,res){
    Contact.find({}, function(err, contacts){
        if(err){
            console.log("error in fetching contacts from db");
            return;
        }
        return res.render('home',{
            title: "Contact List",
            contact_list: contacts
        });

    })
    
});


app.listen(port,function(err){
    if(err){console.log('error in running server',err)}
    console.log("Server is running on port:",port);
});

app.get('/delete_contact/', function(req, res){
    //console.log(req.query);
    //storing id 
    let id = req.query.id;
    //using inbuilt function to delete the matching id element
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error deleting contact');
            return;
        }
        return res.redirect('back');
    })
});

