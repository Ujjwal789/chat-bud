const express = require("express");
const path = require("path");
// const fs = require("fs");
const app = express();
const mongoose = require('mongoose')
const bodyparser = require("body-parser")
const port = 8000;

main().catch( err => console.log(err));

async function main(){
    mongoose.connect('mongodb://127.0.0.1:27017/registerDance');

}


//define mongoose schema
const ResgisterSchema = new mongoose.Schema({
    name: String,
    age: String,
    phone: String,
    email: String,
    address: String,
});

const Resgister = mongoose.model('Register', ResgisterSchema);

//for expess specific stuff
app.use('/static', express.static('static'))
app.use(express.urlencoded())

//for pug specific stuff

app.set('view engine', 'pug') //set templete engine as pug
app.set('views', path.join(__dirname, 'views')) //set the views directory

//Endpoints
app.get('/', (req, res) => {
    const con = "this is the best content on the internet so far on use it wisely"
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/Resgister', (req, res) => {
    const con = "this is the best content on the internet so far on use it wisely"
    const params = {}
    res.status(200).render('Resgister.pug', params);
})
app.post('/Register', (req, res)=>{
    var myData = new Resgister(req.body);
    myData.save().then(()=>{
        res.send("This is item has been send to data base")
    }).catch(()=>{
        res.status(400).send("item has not been save to data bsae")
    })
    
})

//start the server
app.listen(port, () => {
    console.log(`the application started sucessfully on port ${port}`);
});