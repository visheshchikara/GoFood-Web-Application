const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://gofoodmern:mern123@cluster0.e9clf.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);

        console.log("MongoDB connected successfully!");

        const fetchedData = async () => {
            const db = mongoose.connection.db;

            const collection1 = db.collection("food_items");
            const foodItems = await collection1.find({}).toArray();


            const collection2 = db.collection("food_Category");
            const foodCategory = await collection2.find({}).toArray();

            global.food_items = foodItems;
            global.foodCategory = foodCategory;




        };
        await fetchedData();

    } catch (error) {

        console.error("Failed to connect to MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = mongoDB;

