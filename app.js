var express=require("express");
var app=express();
var mysql=require("mysql");
var bodyParser =require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"))
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',   
    database : 'join_us'   // the name of your db
  });

app.get("/",function(req,res)
{
    //Find the count of users in DB
    var q="SELECT COUNT(*) AS count FROM users";
    connection.query(q,function(error,result,fields)
    {
        if(error)throw error;
        var count =result[0].count;
        //res.send("We have "+ count +" users in our db");
        res.render("home",{count:count});

    });
    //Respond with that count
    
//res.send("Hello From The Home Page");
});
app.post("/register",function(req,res)
{
    var person={
        email:req.body.email
    };
    connection.query("INSERT INTO users SET ?",person,function(err,result)
    {
        console.log(err);
        console.log(result);
        res.redirect("/");
    });

});
app.get("/joke",function(req,res)
{
res.send("Why is fruit sweet? thats because fruit is sweet");
});
app.get("/random_num",function(req,res)
{
var num= Math.floor((Math.random()*10)+1);
res.send("Your Lucky num is s"+num);
});
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("myjoin server starTed")
});