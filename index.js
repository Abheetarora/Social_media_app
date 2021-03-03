const express = require('express');
const cookieParser=require('cookie-Parser');
const app = express();
const expressLayouts=require('express-ejs-layouts');
const port=8000;
app.use(express.static('./assets'));
app.use(expressLayouts);
app.use(express.urlencoded());
app.use(cookieParser());
//use exports router
app.use('/',require('./routes'))
//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err)
    {
    console.log(`Error in server running: ${err}`)
    }
    else
    {
        console.log(`server is running on port ${port}`)
    }
});