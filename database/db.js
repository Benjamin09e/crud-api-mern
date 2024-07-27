import mongoose from "mongoose";

const connectToDB = async () =>{
    await mongoose.connect(process.env.MONGO_URI).then((res) =>{
        console.log("Mongo DB connection successfully")
    })
}


export default connectToDB;