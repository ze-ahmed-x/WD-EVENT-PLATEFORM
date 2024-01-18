// this is the pattern used in severless applications like Next and vercel
import mongoose from "mongoose";
const mongoDB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || {conn: null, promise: null};

export const connectToDatabase = async ()=>{
    if (cached.conn) return cached.conn;
    
    if (!mongoDB_URI) throw new Error('MongoDB_URI is missing!');

    cached.promise = cached.promise || mongoose.connect(mongoDB_URI, {
        dbName: 'evently',
        bufferCommands: false,
    });

    cached.conn = await cached.promise;
    return cached.conn;
}
