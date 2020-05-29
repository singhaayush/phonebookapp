var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose =require('mongoose');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Admin:open@cluster0-zsqgc.mongodb.net/test?retryWrites=true&w=majority";
var dbo;


var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static('./public'));
app.listen(3000);//port number

//fire controllers

app.set('view engine','ejs');
app.get('/',function(req,res){
app.use(express.static(__dirname+'/public'));
  res.render('addUser');
});
app.post('/userAdded',urlencodedParser,function(req,res)
{
  MongoClient.connect(uri,function(err,client)
  {
    if(err){
      throw err;
    }
    console.log('Connected....');
    const collection =client.db("test").collection("devices");
     dbo=client.db("phonebookdatabse");
      dbo.collection("contacts").insertOne(req.body,function(err,res){
        if(err)
        throw err;
        console.log("inserted....");
      });

    client.close();
  });
  res.render('addUser');
});
var arrayAllContacts;
app.get('/allContacts',function(req,res)
{
  // arrayAllContacts=[];
  console.log(req.params.name);
  MongoClient.connect(uri,function(err,client)
  {
    if(err){
      throw err;
    }
    console.log('Connected....to..fetch');
    const collection =client.db("test").collection("devices");
     dbo=client.db("phonebookdatabse");
     var mysort = { userName: 1 };
      dbo.collection("contacts").find({}).sort(mysort).toArray(function(err, result) {
    if (err) throw err;
    arrayAllContacts=result;
    res.render('allUsersContacts.ejs',{contacts : result});
    client.close();
  });


});

});
app.get('/singleUser',function(req,res)
{
  // arrayAllContacts=[];
  console.log(req.params.name);
  MongoClient.connect(uri,function(err,client)
  {
    if(err){
      throw err;
    }
    console.log('searching ..user');
    const collection =client.db("test").collection("devices");
     dbo=client.db("phonebookdatabse");
     console.log();
     var query={userName:req.query.searchUser};
      dbo.collection("contacts").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
      res.render('singleUserInfo.ejs',{contacts : result});
    client.close();
  });
});

});
