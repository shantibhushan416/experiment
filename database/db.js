import mongoose from "mongoose";


const Connection = async () => {

    const MONGODB_URI = "mongodb+srv://:@gmailclone.bteqmiy.mongodb.net/?retryWrites=true&w=majority&appName=Gmailclone";
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
    }
}

export default Connection;