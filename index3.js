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

// Middleware to parse JSON request body
app.use(express.json());


app.get('/', async (req, res) => {
    try {
        // Access your database and collection
        const database = client.db('classwork');
        const collection = database.collection('emp');

        const cursor = await collection.find().toArray();


        res.json(cursor)

    } catch (err) {
        console.error('Error retrieving data:', err);
    }
})

// POST endpoint to add employee data
app.post('/employees', async (req, res) => {
    try {
        const database = client.db('classwork');
        const collection = database.collection('emp');

        // Extract employee data from the request body
        const { eno, ename, city, salary } = req.body;

        // Insert the employee data into the collection
        const result = await collection.insertOne({ eno, ename, city, salary });

        // Send the response with the inserted document
        // res.status(201).json(result.ops[0]);
    } catch (err) {
        console.error('Error adding employee data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/delete', async (req, res) => {
    try {
        const database = client.db('classwork');
        const collection = database.collection('emp');

        // Extract employee data from the request body
        const { eno } = req.body;

        // Insert the employee data into the collection
        const result = await collection.deleteOne({ eno });
        res.status(201).json({ mess: "success!..." });
        // Send the response with the inserted document
        // res.status(201).json(result.ops[0]);
    } catch (err) {
        console.error('Error adding employee data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})
app.post('/update', async (req, res) => {
    try {
        const database = client.db('classwork');
        const collection = database.collection('emp');

        // Extract employee data from the request body
        const { eno, ename, city, salary } = req.body;

        // Insert the employee data into the collection
        const result = await collection.updateOne(
            { "eno": eno }, // Update the document with username "john_doe"
            { $set: { "ename": ename, "city": city, "salary": salary } }
        );
        res.status(201).json({ mess: "Updated sucessfully!..." });
        // Send the response with the inserted document
        // res.status(201).json(result.ops[0]);
    } catch (err) {
        console.error('Error adding employee data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
