const mongoose = require("mongoose");
const Campground = require("../Models/campground");
const cities = require("./cities");
const seedHelpers = require("./seedHelpers");

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

const seedDB = async () => {
    await Campground.deleteMany({});
    /*
    const c = new Campground({title: "Purple Fields"});
    await c.save();
    //console.log(c);
    */
   for (let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const randomDescriptors = Math.floor(Math.random() * seedHelpers.descriptors.length);
        const randomPlaces = Math.floor(Math.random() * seedHelpers.places.length);
        const randomPrice = Math.floor(Math.random() * 400);

        const camp = new Campground({
            title: `${seedHelpers.descriptors[randomDescriptors]} ${seedHelpers.places[randomPlaces]}`,
            price: randomPrice,
            description: `${seedHelpers.descriptors[randomDescriptors]} ${seedHelpers.places[randomPlaces]}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`
        });
        await camp.save();
        //console.log(camp);
   }
   console.log("Seeded");
}

seedDB().then(() => {
    mongoose.connection.close;
});