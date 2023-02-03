import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import MongoClient from 'mongoose';
import cors from 'cors';

dotenv.config();

const app = express();

const uri = "mongodb+srv://luzbe:luzbe420@cluster0.ghu0ofz.mongodb.net/ecommercedb";

MongoClient.connect(uri, {
    useUnifiedTopology: true
}).then(client => {
    console.log('Connected to Database');
    const db = client.db('ecommercedb');
    const usersCollection = db.collection('users');


    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    app.get('/users', (req, res) => {
        const cursor = db.collection('quotes').find()
        console.log(cursor);

        console.log('kkk');
        usersCollection.find().toArray()
            .then(results => {
                res.json(results);
            })
            .catch(error => console.error(error))
    });

    /* app.post('/users-list', (req, res) => {

        usersCollection.insertOne(req.body)
            .then(result => {
                res.json(req.body);
            })
            .catch(error => console.error(error))
    });
    app.put('/users-list', (req, res) => {
        usersCollection.findOneAndUpdate({ ID: req.body.ID },
            {
                $set: req.body
            },
            {
                upsert: true
            })
            .then(result => {
                res.json(req.body);
            })
            .catch(error => console.error(error))
    });
    app.delete('/users-list',  (req, res) => {
        usersCollection.deleteOne(
            { ID: req.body.ID }
        )
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.json('No user to delete')
                }
                res.json(``)
            })
            .catch(error => console.error(error))
    }); */
    app.listen(5000, () => {
        console.log('listening on 5000')
    });


}).catch(err => console.log("Not Connected to Database ERROR! ", err));