import mongoose from "mongoose";

export const connectDB=()=>{mongoose.connect("mongodb://localhost:27017",{
    dbName:"portfolio",

}).then(()=> console.log("DATABASE CONNECTED"))
.catch((e)=>console.log(e))};
