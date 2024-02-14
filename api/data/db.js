const mongoose = require('mongoose');
const callbackify = require('util').callbackify;
require('./user-model');
require('./skincare-product-model');


mongoose.connect(process.env.DB_URL);
const mongooseConnectionCloseWithCallback = callbackify(mongoose.connection.close);

mongoose.connection.on(process.env.MONGOOSE_CONNECTED, function () {
    console.log(process.env.CONNECTED_TO_DB_MESSAGE + process.env.DB_NAME);
});
mongoose.connection.on(process.env.MONGOOSE_DISCONNECTED, function () {
    console.log(process.env.MONGOOSE_DISCONNECTED_MESSAGE);
});

mongoose.connection.on(process.env.MONGOOSE_ERROR, function (err) {
    console.log(process.env.MONGOOSE_ERROR_MESSAGE, err);
});

mongoose.connection.on(process.env.SIGINT, function () {
    mongooseConnectionCloseWithCallback(function () {
        console.log(process.env.SIGNINT_MESSAGE);
        process.exit(0);
    });
});

process.on(process.env.SIGTERM, function () {
    mongooseConnectionCloseWithCallback(function () {
        console.log(process.env.SIGTERM_MESSAGE);
        process.exit(0);
    });
});


