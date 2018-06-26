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
                    }).then(result => res.send(result))
                       .catch(err => {
                            res.send(`An Error has occured: ${err}`)
                     }) 
})

app.get('/number/:number', (req, res) => {
    const inputValue = Number(req.params.number);

    if(isNaN(inputValue)){ 
        alert('Invalid Input')
        return res.status(400).send(); 
    }

    const convertedValue = operations.numberToRoman(inputValue);
    const outcome = { inputValue,convertedValue }   
     db.collection('number').update(outcome, outcome, {
                 upsert: true
             }).then(result => res.send(result))
             .catch(err => {
                res.send(`An Error has occured: ${err}`)
             })
})

app.delete('/remove/all', (req, res) =>{
    db.collection('arabic').deleteMany({}).then(result => res.send(result))
                            .catch(err => res.send(`An Error has occured: ${err}`))
    db.collection('number').deleteMany({}).then(result => res.send('records have been deleted'))
        .catch(err => res.send(`An Error has occured: ${err}`))
})