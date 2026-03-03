import { MongoClient } from 'mongodb';

const uri = 'mongodb://0.0.0.0:27017/estimacion';

let client;
let clientPromise;

if (!uri) {
    throw new Error('Define MONGODB_URI en .env.local');
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export default clientPromise;