import mongoose from "mongoose";

const connection = {};

export default async function database() {
    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useunifiedTopology: true,
    })

    connection.isConnected = db.connections[0].readyState
    console.log(connection.isConnected);
}