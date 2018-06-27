const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const alert = require('alert-node')
const operations = require('../functions'); 
const data = require('../config/db')

const port = process.env.PORT || 3000

const app = express();

//const url = 'mongodb://localhost:27017/';
let db;

MongoClient.connect(data.url, (err, database) => {
    if (err) return console.error(err);
    db = database.db('converter');

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
       res.send(`An Error has occured: ${err}`)
   })
})

app.get('/arabic/:number', (req, res) => {
    const inputValue = req.params.number;
    const convertedValue = operations.romanToNumber(inputValue);
    console.log(convertedValue)

    if(convertedValue === undefined){
        alert('Invalid Input')
        return res.status(400).send()
    }

    const outcome = {inputValue, convertedValue}
    db.collection('arabic').update(outcome, outcome, {
                    upsert:true
                    }).then(result => res.send(outcome))
                       .catch(err => {
                            res.send(`An Error has occured: ${err}`)
                     }) 
})

app.get('/roman/:number', (req, res) => {
    const inputValue = Number(req.params.number);

    if(isNaN(inputValue)){ 
        alert('Invalid Input')
        return res.status(400).send(); 
    }

    const convertedValue = operations.numberToRoman(inputValue);
    const outcome = { inputValue,convertedValue }   
     db.collection('roman').update(outcome, outcome, {
                 upsert: true
             }).then(result => res.send(outcome))
             .catch(err => {
                res.send(`An Error has occured: ${err}`)
             })
})

app.delete('/remove/all', async (req, res) =>{
    try {
         const arabic = await db.collection('arabic').deleteMany({});
         const roman = await db.collection('roman').deleteMany({});
         res.send('job done')
    } catch(err) {
        console.log(err)
        res.status(500).send()
    }
   
})