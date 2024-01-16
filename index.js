const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');
let port = 8080;

const { v4: uuidv4 } = require('uuid');

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(methodOverride('_method'));



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));




let posts = [
  {
    id:uuidv4(),
    username :"Ashraful",
    content : "i love coding and the the future is web3"
  },
  {
    id:uuidv4(),
    username :"Bitto",
    content : "some days ago ,  my name as singer bitto in but i change it"
  },
  {
    id:uuidv4(),
    username :"Goblu",
    content : " content creater is  are the next bussiness"
  },
];



app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new",(req,res) =>{
  res.render("new.ejs");
});

app.post("/posts" , (req,res) =>{
  let id =uuidv4();
  let {username,content} = req.body;
  posts.push({id ,username ,content});
  res.redirect("/posts");
});


app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  if (post) {
    res.render("show.ejs", { post });
  } else {
    res.render("error.ejs");
  }
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent ;
  console.log(post)
   res.redirect("/posts");
});

app.get("/posts/:id/edit" , (req,res) =>{
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs" ,{post});

});

app.delete("/posts/:id" , (req , res) =>{
  let { id } = req.params;
  posts =posts.filter((p) =>id !== p.id);
  res.redirect("/posts");

})


app.listen(port, () => {
  console.log("Server listening on port", port);
}); 