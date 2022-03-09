'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const signinRouter = require('./auth/router/signin')
const signupRouter = require('./auth/router/signup')
const secretRouter = require('./auth/router/secretstuff')
const usersRouter = require('./auth/router/Users')
const notFoundHandler = require('./error-handler/404');
const errorHandler = require('./error-handler/500');

app.use(express.json());
app.use(cors());
app.use(signinRouter);
app.use(signupRouter);
app.use(secretRouter);
app.use(usersRouter);


function start(port) {
    app.listen(port,()=> console.log(`Running on Port ${port}`))
}

app.get('/',(req,res)=>{
    res.send('server is alive')
})

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports ={
    app : app ,
    start : start
}