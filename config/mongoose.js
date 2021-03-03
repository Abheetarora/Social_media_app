const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db= mongoose.connection;
db.on('Error',console.error.bind(console,"Error connecting to DB"));

db.once('open',function (){
console.log("Connected to Mongo DB :: Database")
});
module.exports = db;