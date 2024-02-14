const Mongoose = require('mongoose');
const SkincareModel = Mongoose.model(process.env.SKINCARE_PRODUCT_MODEL);
const { authenticate, checkAuthenticationHeaderExists } = require("./jwtUtils");


const createResponse = function () {
    return { status: parseInt(process.env.OK_STATUS_CODE), message: "" };
};

const setResponse = function (response, code, message) {
    response.status = parseInt(code);
    response.message = message;
};

const setErrorResponse = function (err, response) {

    response.status = parseInt(err.status);
    response.message = err.message;
};

const sendResponse = function (res, response) {
    res.status(parseInt(response.status)).json(response.message);
};
const getSkincareId = function (req) {
    return req.params && req.params.id;
};


const getActiveIngredientId = function (req) {
    return req.params && req.params.activeIngredientId;
};




const _getAddedActiveIngredient = function (skincareProduct) {
    return Promise.resolve(skincareProduct.activeIngredients[skincareProduct.activeIngredients.length - 1]);
};

const _saveSkincareProduct = function (product) {
    return SkincareModel.findOneAndUpdate({ _id: product._id }, product, { new: true });
};

const _fullActiveIngredientFill = function (req, foundSkincareProduct) {
    return new Promise((resolve, reject) => {
        const activeIngredientId = getActiveIngredientId(req);
        const activeIngredientToBeUpdated = foundSkincareProduct.activeIngredients.id(activeIngredientId);
        activeIngredientToBeUpdated.name = req.body.name;
        activeIngredientToBeUpdated.benefits = req.body.benefits;
        activeIngredientToBeUpdated.ingredientType = req.body.ingredientType;
        resolve(foundSkincareProduct);
    });

};

const _partialActiveIngredientFill = function (req, foundSkincareProduct) {
    return new Promise((resolve, reject) => {
        const activeIngredientId = getActiveIngredientId(req);
        const activeIngredientToBeUpdated = foundSkincareProduct.activeIngredients.id(activeIngredientId);
        if (req.body.name) activeIngredientToBeUpdated.name = req.body.name;
        if (req.body.benefits) activeIngredientToBeUpdated.benefits = req.body.benefits;
        if (req.body.ingredientType) activeIngredientToBeUpdated.ingredientType = req.body.ingredientType;
        resolve(foundSkincareProduct);
    });
};

const _checkActiveIngredientExists = function (activeIngredient) {
    return new Promise((resolve, reject) => {
        if (activeIngredient) {
            resolve(activeIngredient);
        } else {
            reject({ status: parseInt(process.env.NOT_FOUND_STATUS_CODE), message: process.env.NOT_FOUND_MESSAGE });
        }
    });
};

const _checkSkincareProductExists = function (skincareProduct) {
    return new Promise((resolve, reject) => {
        if (skincareProduct) {
            resolve(skincareProduct);
        } else {
            reject({ status: parseInt(process.env.NOT_FOUND_STATUS_CODE), message: process.env.NOT_FOUND_MESSAGE });
        }
    });
};
const _addActiveIngredient = function (activeIngredient, skincareProduct) {
    return new Promise((resolve, reject) => {
        skincareProduct.activeIngredients.push(activeIngredient);
        resolve(skincareProduct);
    }
    );
};

const _findActiveIngredients = function (skincareProduct) {
    return Promise.resolve(skincareProduct.activeIngredients);
};

const _findActiveIngredient = function (skincareProduct, activeIngredientId) {
    return Promise.resolve(skincareProduct.activeIngredients.id(activeIngredientId));
};

const _deleteActiveIngredient = function (skincareId, activeIngredientId) {
    return SkincareModel.findOneAndUpdate({ _id: skincareId }, { $pull: { activeIngredients: { _id: activeIngredientId } } });
};

const findAllActiveIngredients = function (req, res) {
    const skincareId = getSkincareId(req);
    const result = createResponse();
    SkincareModel.findById(skincareId)
        .then((skincareProduct) => _checkSkincareProductExists(skincareProduct))
        .then((foundSkincareProduct) => _findActiveIngredients(foundSkincareProduct))
        .then((activeIngredients) => setResponse(result, process.env.OK_STATUS_CODE, activeIngredients))
        .catch((err) => setErrorResponse(err, result))
        .finally(() => sendResponse(res, result));
};



const findOneActiveIngredient = function (req, res) {
    const skincareId = getSkincareId(req);
    const activeIngredientId = getActiveIngredientId(req);
    const result = createResponse();
    SkincareModel.findById(skincareId)
        .then((skincareProduct) => _checkSkincareProductExists(skincareProduct))
        .then((foundSkincareProduct) => _findActiveIngredient(foundSkincareProduct, activeIngredientId))
        .then((activeIngredient) => _checkActiveIngredientExists(activeIngredient))
        .then((foundActiveIngredient) => setResponse(result, process.env.OK_STATUS_CODE, foundActiveIngredient))
        .catch((err) => setErrorResponse(err, result))
        .finally(() => sendResponse(res, result));

};


const addActiveIngredient = function (req, res) {
    const skincareId = getSkincareId(req);
    const activeIngredient = req.body;
    const result = createResponse();
    checkAuthenticationHeaderExists(req)
        .then((token) => authenticate(token, process.env.PRIVATE_KEY))
        .then(() => SkincareModel.findById(skincareId))
        .then((skincareProductFromDB) => _checkSkincareProductExists(skincareProductFromDB, result))
        .then((foundSkincareProduct) => _addActiveIngredient(activeIngredient, foundSkincareProduct))
        .then((updatedSkincareProduct) => _saveSkincareProduct(updatedSkincareProduct))
        .then((savedSkincareProduct) => _checkSkincareProductExists(savedSkincareProduct))
        .then((savedSkincareProduct) => _getAddedActiveIngredient(savedSkincareProduct))
        .then((savedActiveIngredient) => setResponse(result, process.env.CREATED_STATUS_CODE, savedActiveIngredient))
        .catch((err) => setErrorResponse(err, result))
        .finally(() => sendResponse(res, result));
};

const fullUpdateActiveIngredient = function (req, res) {
    const skincareId = getSkincareId(req);
    const activeIngredientId = getActiveIngredientId(req);
    const result = createResponse();
    SkincareModel.findById(skincareId)
        .then((skincareProduct) => _checkSkincareProductExists(skincareProduct))
        .then((foundSkincareProduct) => _fullActiveIngredientFill(req, foundSkincareProduct))
        .then((updatedSkincareProduct) => _saveSkincareProduct(updatedSkincareProduct))
        .then((savedSkincareProduct) => _findActiveIngredient(savedSkincareProduct, activeIngredientId))
        .then((updatedActiveIngredient) => setResponse(result, process.env.OK_STATUS_CODE, updatedActiveIngredient))
        .catch((err) => setErrorResponse(err, result))
        .finally(() => sendResponse(res, result));
};

const partialUpdateActiveIngredient = function (req, res) {
    const skincareId = getSkincareId(req);
    const activeIngredientId = getActiveIngredientId(req);
    const result = createResponse();
    SkincareModel.findById(skincareId)
        .then((skincareProduct) => _checkSkincareProductExists(skincareProduct))
        .then((foundSkincareProduct) => _partialActiveIngredientFill(req, foundSkincareProduct))
        .then((updatedSkincareProduct) => _saveSkincareProduct(updatedSkincareProduct))
        .then((savedSkincareProduct) => _findActiveIngredient(savedSkincareProduct, activeIngredientId))
        .then((updatedActiveIngredient) => setResponse(result, process.env.OK_STATUS_CODE, updatedActiveIngredient))
        .catch((err) => setErrorResponse(err, result))
        .finally(() => sendResponse(res, result));
};



const deleteActiveIngeredient = function (req, res) {
    const skincareId = getSkincareId(req);
    const activeIngredientId = getActiveIngredientId(req);
    const result = createResponse();
    checkAuthenticationHeaderExists(req)
        .then((token) => authenticate(token, process.env.JWT_SECRET_KEY))
        .then(() => SkincareModel.findById(skincareId))
        .then((skincareProduct) => _checkSkincareProductExists(skincareProduct))
        .then((foundSkincareProduct) => _findActiveIngredient(foundSkincareProduct, activeIngredientId))
        .then((activeIngredient) => _checkActiveIngredientExists(activeIngredient))
        .then((foundActiveIngredient) => _deleteActiveIngredient(skincareId, activeIngredientId))
        .then((deletedActiveIngredient) => setResponse(result, process.env.OK_STATUS_CODE, "Successfully deleted"))
        .catch((err) => setErrorResponse(err, result))
        .finally(() => sendResponse(res, result));
};





module.exports = {
    findAllActiveIngredients,
    findOneActiveIngredient,
    addActiveIngredient,
    updateActiveIngredient: fullUpdateActiveIngredient,
    partialUpdateActiveIngredient,
    deleteActiveIngeredient
};
