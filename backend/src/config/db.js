import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB Connected successfully!");
    }catch(error){
        console.error("Error conneting to MONGODB",error);
        process.exit(1) // exit with failure 
    }
}