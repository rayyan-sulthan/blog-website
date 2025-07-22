import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const formData = [];

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));



app.get("/",(req, res)=>{
    res.render("index.ejs", {formdata:formData});
    
});
app.get("/createPost",(req, res)=>{
    res.render("createPost.ejs");
    
});
app.get("/editPost",(req, res)=>{
    res.render("editPost.ejs",{formdata:formData});
    
});
app.get("/about",(req, res)=>{
    res.render("partials/about.ejs");
    
});

app.post("/submit",(req,res)=>{
   const {title, content , password} = req.body;
   formData.push( {title, content , password} );
   res.redirect("/");

});
app.post("/updatePost",(req,res)=>{
   const {index, title, content , password} = req.body;
   if(formData[index] && formData[index].password===password){
    formData[index].title=title;
    formData[index].content=content;
    res.redirect("/editPost");
   }else{
    res.send("incorrect password cannot edit the post")
   }

});
app.post("/deletePost",(req,res)=>{
   const {index, password} = req.body;
   if( formData[index] && formData[index].password=== password){
    formData.splice(index,1);
    res.redirect("/editPost");
   }
   else{
    res.send("invalid password")
   }

});

app.listen(port, ()=> {
    console.log(`the conntion is on http://localhost:${port}`);
});