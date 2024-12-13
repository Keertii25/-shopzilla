

const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const mongourl = "mongodb://127.0.0.1:27017/shopzilla";

async function main() {
    try {
        await mongoose.connect(mongourl);
        console.log("Connected to the database");
    } catch (err) {
        console.error("Error connecting to the database:", err);
        process.exit(1); // Exit the process if connection fails
    }
}

const initDb = async () => {
    try {
        // Ensure connection before proceeding
        if (!mongoose.connection.readyState) {
            throw new Error("Database connection not established");
        }

        // Delete all existing records
        await Listing.deleteMany({});
        console.log("Existing listings cleared");

        // Map and prepare the new data
        initdata.data = initdata.data.map((obj) => ({
            ...obj,
            owner: "6743ee317b5f74e0fdbfc63b",
            image: obj.image
              ? { url: obj.image, filename: obj.image.split("/").pop() }
              : { url: "https://via.placeholder.com/300?text=No+Image+Available", filename: "placeholder.jpg" },
        }));
        
        await Listing.insertMany(initdata.data);
        console.log("Data was initialized");
        
        // Insert the new data
       
    } catch (err) {
        console.error("Error initializing the database:", err);
    } finally {
        mongoose.connection.close(); // Close the connection
    }
};

// Run the main function and initialize the database
main().then(() => initDb());




