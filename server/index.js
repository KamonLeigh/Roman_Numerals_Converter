const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb')
const bodyParser = require('body-parser');
const operations = require('../functions')

const port = process.env.PORT || 3000

const app = express();
app.use(bodyParser.urlencoded({extended:true}))

const url = 'mongodb://localhost:27017/';
let db;

MongoClient.connect(url, (err, database) => {
    if (err) return console.error(err);
    db = database.db('roman_numerals_converter');
    console.log('connecting to server')

    app.listen(port, () => {
        console.log('listening on 3000')
    })
});



app.get('/all/:numeralType', (req, res) => {
    const route = req.params.numeralType

       db.collection(route).find().toArray().then((doc) =>{
       console.log(JSON.stringify(doc, undefined, 2))
       res.send(doc)
   }).catch(err => {
       console.log(err)
   })
})


app.post('/arabic', (req, res) => {
    const inputValue = req.body.inputValue;
    const convertedValue = operations.romanToNumber(inputValue);

    const outcome = {inputValue, convertedValue}
    db.collection('arabic').update(outcome, outcome, {upsert:true}).then(result => res.send(result))
                                           .catch(err => {
                                               console.log(err)
                                           }) 
})


app.post('/number', (req, res) => {
    const inputValue = Number(req.body.inputValue);
    const convertedValue = operations.numberToRoman(inputValue);
    const outcome = {
        inputValue,
        convertedValue
    }
    db.collection('number').update(outcome, outcome, {
            upsert: true
        }).then(result => res.send(result))
        .catch(err => {
            console.log(err)
        })
})


app.delete('/remove/all', (req, res) =>{
    db.collection('arabic').deleteMany({}).then(result => res.send(result))
                            .catch(err => console.log(err))
    db.collection('number').deleteMany({}).then(result => res.send(result))
        .catch(err => console.log(err))
})