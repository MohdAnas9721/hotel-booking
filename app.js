const express = require("express");
const ejsLayouts = require("express-ejs-layouts"); 
const path = require("path");
const methodOverride = require("method-override"); 
const ejsMate = require("ejs-Mate");
const Listing = require("./models/listing");
const app = express();
const mongoose = require("mongoose");



const MONGO_URL = "mongodb://127.0.0.1:27017/Airbnb";

main()
    .then(() => { 
        console.log("Connect to Data Base ");
    })
    .catch((err) =>{ 
        console.log(err);
    })

async function main(){ 
        await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
// public folder setup (Css , images , js)
app.use(express.static(path.join(__dirname, "public")));

app.use(ejsLayouts); 
app.set("layout", "layouts/boilerplate");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("I am root ");
});

// listing routes 
app.get("/listings" , async(req , res) => { 
 const allListing =  await Listing.find({});
  res.render("listings/index.ejs", {allListing});
}); 

// new 

app.get("/listings/new" , (req , res ) => { 
  res.render("listings/new.ejs")
});

// shpw 

app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id); 
  res.render("listings/show.ejs", { listing });
});


// psot rout 

app.post("/listings" , async (req , res) => { 
  const newListing = new Listing(req.body.listing); 
 await newListing.save();
   res.redirect("/listings");
})




// Edit form
app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});


// edit put 

app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;

  await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  res.redirect(`/listings/${id}`);
});

//Delete 

app.delete("/listings/:id", async (req, res) => { 
  let {id } = req.params;
  let deleteListing = await Listing.findByIdAndDelete(id);
  console.log(deleteListing);
  res.redirect("/listings");
})

// app.get("/listing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "first testing of the project",
//     description: "testing of the description of the project",
//     price: 1200,
//     location: "China, country testing",
//   });

//   await sampleListing.save();
//   console.log("Listing saved successfully");
//   res.send("Success");
// });

app.listen(3000, () => { 
  console.log("server is running on http://localhost:3000");
});
