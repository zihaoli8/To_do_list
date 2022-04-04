const express = require("express");
const bodyParser = require("body-parser");
//use the express package
const app = express();
const date = require(__dirname + "/date.js");

const items = ["Buy food", "Cook food", "Eat food"];
const workItems = []
app.set('view engine', 'ejs');
// use the static css and image
// app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.get("/", function(req, res) {
  let day = date();
  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});
app.post("/", function(req, res) {
  let item = req.body.newItem;
  console.log(req.body);
  if (req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  } else{
    items.push(item);
    res.redirect("/");
  }
});
app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems})
});

app.listen(3000, function() {
  console.log("Server is running on port 3000")
});
