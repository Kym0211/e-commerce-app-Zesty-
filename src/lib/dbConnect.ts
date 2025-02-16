import { log } from "console";
import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
}

const connection: ConnectionObject = {};

async function dbConnect() {
    if (connection.isConnected) {
        log("Already connected to database");
        return;
    }
    try {
        const dp = await mongoose.connect(process.env.MONGODB_URI || ' ', {});
        connection.isConnected = dp.connections[0].readyState;
    } catch (error) {
        log("Error connecting to database", error);
        process.exit();
    }   
}

export default dbConnect;