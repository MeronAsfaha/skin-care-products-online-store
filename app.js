require('dotenv').config();
require('./api/data/db');
const express = require('express');
const apiRouter = require('./api/routes/apiRoutes');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "PUT,PATCH,DELETE,GET,POST");
    next();
});

app.use('/api', apiRouter);

app.use("**", function (error, req, res, next) {
    res.status(parseInt(process.env.NOT_FOUND_STATUS_CODE)).json(process.env.NOT_FOUND_MESSAGE);
});
 
const server = app.listen(process.env.PORT, function () {
    console.log(process.env.MSG_SERVER_START + server.address().port);
});

