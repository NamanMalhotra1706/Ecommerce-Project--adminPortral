import mongoose from "mongoose";

export function mongooseConnect(){
    if(mongoose.connect.readyState ===1){
        return mongoose.connection.asPromise();
    }
    else{
    const uri = process.env.MONGODB_URI;
    return mongoose.connect(uri);
}
}