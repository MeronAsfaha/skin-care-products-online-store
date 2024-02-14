const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UsersModel = mongoose.model(process.env.USER_MODEL);
const { generateToken } = require("./jwtUtils");

const generateHash = function (password, salt) {
    return bcrypt.hash(password, salt);
};
const generateSalt = function () {
    return bcrypt.genSalt(parseInt(process.env.SALT_GENERATION_COST));
};

const setPassword = function (user, password) {
    return Promise.resolve(user.password = password);
};

const setResponse = function (response, code, user) {
    response.status = parseInt(code);
    response.message = user;
};

const setErrorResponse = function (response) {
    response.status = parseInt(process.env.UNAUTHORIZED_STATUS_CODE);
    response.message = process.env.UNAUTHORIZED_MESSAGE;
};

const sendResponse = function (res, response) {
    res.status(response.status).json(response.message);
};

const createUser = function (user) {
    return UsersModel.create(user);
};

const _newUser = function (req) {
    return {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    };
};

const _createResponse = function () {
    return { status: parseInt(process.env.OK_STATUS_CODE), message: {} };
};

const comparePasswords = function (password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
};

const loginQuery = function (userName) {
    return { username: userName };
};

const _checkUserExists = function (user) {
    return new Promise((resolve, reject) => {
        if (user) {
            resolve(user);
        }
        else {
            reject();
        }
    }
    );
};

const checkIfMatching = function (match) {
    return new Promise((resolve, reject) => {
        if (match) {
            resolve();
        }
        else {
            reject();
        }
    }
    );

};


const registerUser = function (req, res) {
    const response = _createResponse();
    if (req.body) {
        const newUser = _newUser(req);
        generateSalt()
            .then((salt) => generateHash(req.body.password, salt))
            .then((hashedPassword) => setPassword(newUser, hashedPassword))
            .then(() => createUser(newUser))
            .then((savedUser) => setResponse(response, process.env.CREATED_STATUS_CODE, savedUser.name))
            .catch(() => setErrorResponse(response))
            .finally(() => sendResponse(res, response));
    }
};

const login = function (req, res) {
    const response = _createResponse();
    const loginUser = _newUser(req);
    const query = loginQuery(loginUser.username);
    UsersModel.findOne(query)
        .then((userFromDB) => _checkUserExists(userFromDB))
        .then((existingUser) => comparePasswords(loginUser.password, existingUser.password))
        .then((match) => checkIfMatching(match))
        .then(() => generateToken({ sub: loginUser.username }, process.env.PRIVATE_KEY))
        .then((token) => setResponse(response, process.env.OK_STATUS_CODE, { accessToken: token }))
        .catch(() => setErrorResponse(response))
        .finally(() => sendResponse(res, response));
};

module.exports = {
    login,
    registerUser
}

