const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./Models/campground");

mongoose.connect("mongodb://localhost:27017/YelpCamp", {
    useNewURLParser: true,
    //createUserIndex: true,        // Not supported in mongoose?
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));

app.use(express.urlencoded({extended: true}));

/*  GET Request for homepage */
app.get("/", (req, res) => {
    //res.send("HELLO");
    res.render("home");
})

/* Creating index page */
app.get("/campgrounds", async (req, res) => {
    const allCampgrounds = await Campground.find({})
    res.render("campgrounds/index", {allCampgrounds});
})

/* Create a new campsite
    get request shows the input form
    post request adds new campsite to database
*/
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
    //res.send("NEW")
})

app.post("/campgrounds", async (req, res) => {
    //res.send(req.body);
    //console.log(req.body.campground);
    const newCampground = new Campground(req.body.campground);
    await newCampground.save();
    res.redirect(`/campgrounds/${newCampground._id}`);
})



/* View details for a single campsite */
app.get("/campgrounds/:id", async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    res.render("campgrounds/view", {campground});
})




const port = 5000
app.listen(port, () => {
    console.log("Listening on port ", port);
})