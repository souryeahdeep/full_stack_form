import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app=express();
const port = 3000;

let reversed="";
let submitted=false;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db=new pg.Client({
    user: "postgres",
    password:"sourya3110",
    host:"localhost",
    database:"World",
    port:"5432"
});

db.connect();

app.get("/",async(req,res)=>{
    
    res.render("index.ejs");
    });
    
app.post("/submit", async(req,res) =>{
    submitted=false;
    let SCHName=req.body["SCHName"];
    let Fname=req.body["FName"];
    let Lname=req.body["LName"];
    let PFName=req.body["PFName"];
    let PLName=req.body["PLName"];
    let PFNum=req.body["PFNum"];
    let PFmail=req.body["PFmail"];
    console.log(SCHName);
     
    await db.query("INSERT INTO persoinfo (first_name, last_name, gu_first, gu_last, gu_mail,school_name,numb) VALUES ($1,$2,$3,$4,$5,$6,$7)",[Fname,Lname,PFName,PLName,PFmail,SCHName,PFNum]);
    submitted=true;
    console.log(submitted);
    res.render("index.ejs",{submit:  submitted});
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});