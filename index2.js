const express = require('express');
const app = express();
const port = 3000;


const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb+srv://arpantiwari150:arpan197@cluster1.xwrxxeb.mongodb.net/';

// Create a new MongoClient
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('Connected to the database');
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}



// Call the function to connect
connectToDatabase();


async function getData() {
    try {
        // Access your database and collection
        const database = client.db('classwork');
        const collection = database.collection('emp');

        // Query all documents in the collection
        const cursor = await collection.find().toArray();

        // Iterate over the cursor to access each document
        // await cursor.forEach(doc => {
        //     // console.log(doc);

        // });

        app.get('/', (req, res) => {
                res.json(cursor)
        });

    } catch (err) {
        console.error('Error retrieving data:', err);
    }
}

// Call the function to retrieve data
getData();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  