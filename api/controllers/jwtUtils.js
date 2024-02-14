const jwt = require("jsonwebtoken");

const checkAuthenticationHeaderExists = function (req) {
    return new Promise((resolve, reject) => {
        if (req.headers.authorization) {
            resolve(req.headers.authorization.split(" ")[1]);
        }
        else {
            reject({ status: process.env.UNAUTHORIZED_STATUS_CODE, message: process.env.UNAUTHORIZED_MESSAGE });
        };
    });
};

const generateToken = function (payload, privateKey) {
    return Promise.resolve(jwt.sign(payload, privateKey, { expiresIn: '1d' }));
};
const authenticate = function (token, privateKey) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, privateKey, function (err, decoded) {
            if (err) {
                reject({ status: process.env.UNAUTHORIZED_STATUS_CODE, message: process.env.UNAUTHORIZED_MESSAGE });
            }
            else {
                resolve(decoded);
            };
        });
    });
};


module.exports = {
    checkAuthenticationHeaderExists,
    generateToken,
    authenticate
};