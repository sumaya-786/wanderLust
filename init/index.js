const mongoose =require("mongoose");
const initData=require("./data.js");
const Listing =require("../models/listing.js");
console.log("Listing model: ", Listing);


const mongo_url="mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=>{
    console.log("connected to db")
})
.catch((err)=>{
    console.log(err)
});

async function main(){
    await mongoose.connect(mongo_url);
    await initDB();
}


const initDB= async ()=>{
    await Listing.deleteMany({});
    console.log("Deleting old data...");
    initData.data=initData.data.map((obj)=>({...obj,owner:"6803d01762c7df12f71b5506"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};
initDB();


// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

// const initDB = async () => {
//   await Listing.deleteMany({});
//   console.log("Deleting old data...");
//   initData.data = initData.data.map((obj) => ({
//     ...obj,
//     owner: "6803d01762c7df12f71b5506",
//   }));
//   await Listing.insertMany(initData.data);
//   console.log("Data was initialized");
// };

// (async () => {
//   try {
//     await mongoose.connect(mongo_url);
//     console.log("Connected to DB");
//     await initDB();
//     console.log("All data inserted!");
//     await mongoose.connection.close(); // optional, clean shutdown
//   } catch (err) {
//     console.error("Error initializing DB:", err);
//   }
// })();
