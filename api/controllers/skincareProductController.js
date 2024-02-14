const mongoose = require("mongoose");
const SkincareProductModel = mongoose.model(process.env.SKINCARE_PRODUCT_MODEL);
const { authenticate, checkAuthenticationHeaderExists } = require("./jwtUtils");



const _newProduct = function (req) {
  return {
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    skinType: req.body.skinType,
    activeIngredients: req.body.activeIngredients
  };
};

const sendResponse = function (res, response) {
  res.status(parseInt(response.status)).json(response.message);
};

const _saveProduct = function (product) {
  return product.save();
};
const _checkProductExists = function (product) {
  return new Promise((resolve, reject) => {
    if (product) {
      resolve(product);
    } else {
      reject({ status: parseInt(process.env.NOT_FOUND_STATUS_CODE), message: process.env.NOT_FOUND_MESSAGE });
    }
  });
};
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

const _partialSkincareFill = function (req, skincareProduct) {
  return new Promise((resolve, reject) => {
    if (req.body.name) skincareProduct.name = req.body.name;
    if (req.body.manufacturer) skincareProduct.manufacturer = req.body.manufacturer;
    if (req.body.skinType) skincareProduct.skinType = req.body.skinType;
    if (req.body.activeIngredients) skincareProduct.activeIngredients = req.body.activeIngredients;
    resolve(skincareProduct);
  });
};

const _fullSkincareFill = function (req, skincareProduct) {
  return new Promise((resolve, reject) => {
    skincareProduct.name = req.body.name;
    skincareProduct.manufacturer = req.body.manufacturer;
    skincareProduct.skinType = req.body.skinType;
    skincareProduct.activeIngredients = req.body.activeIngredients;
    resolve(skincareProduct);
  });
};

const getId = function (req) {
  return req.params && req.params.id;
};


const getAll = function (req, res) {
  const offset = parseInt(req.query.offset) || process.env.DEFAULT_FIND_OFFSET;
  const count = process.env.DEFAULT_FIND_COUNT;
  


  const result = createResponse();
  SkincareProductModel.find()
    .skip(offset)
    .limit(count)
    .then((skincareProductsFromDB) => _checkProductExists(skincareProductsFromDB))
    .then((foundSkincareProducts) => setResponse(result, process.env.OK_STATUS_CODE, foundSkincareProducts))
    .catch((err) => setErrorResponse(err, result))
    .finally(() => sendResponse(res, result));
};


const getById = function (req, res) {
  const id = getId(req);
  const result = createResponse();
  SkincareProductModel.findById(id)
    .then((skincareProductFromDB) => _checkProductExists(skincareProductFromDB))
    .then((foundSkincareProduct) => setResponse(result, process.env.OK_STATUS_CODE, foundSkincareProduct))
    .catch((err) => setErrorResponse(err, result))
    .finally(() => sendResponse(res, result));

};

const create = function (req, res) {
  const skincareProduct = _newProduct(req);
  const result = createResponse();
  checkAuthenticationHeaderExists(req)
    .then((token) => authenticate(token, process.env.PRIVATE_KEY))
    .then(() => SkincareProductModel.create(skincareProduct))
    .then((skincareProduct) => setResponse(result, process.env.CREATED_STATUS_CODE, skincareProduct))
    .catch((err) => setErrorResponse(err, result)).finally(() => sendResponse(res, result));
};

const deleteById = function (req, res) {
  const id = getId(req);
  const result = createResponse();
  checkAuthenticationHeaderExists(req)
    .then((token) => authenticate(token, process.env.PRIVATE_KEY))
    .then(() => SkincareProductModel.findByIdAndDelete(id))
    .then((skincareProductFromDB) => _checkProductExists(skincareProductFromDB))
    .then((deletedSkincareProduct) => setResponse(result, process.env.OK_STATUS_CODE, "Successfully Deleted"))
    .catch((err) => setErrorResponse(err, result))
    .finally(() => sendResponse(res, result)
    );
};

const fullUpdateOne = function (req, res) {
  const id = getId(req);
  const response = createResponse();
  SkincareProductModel.findById(id)
    .then((productFromDB) => _checkProductExists(productFromDB))
    .then((foundProduct) => _fullSkincareFill(req, foundProduct))
    .then((updatedProduct) => _saveProduct(updatedProduct))
    .then((savedProduct) => setResponse(response, process.env.OK_STATUS_CODE, savedProduct))
    .catch((err) => setErrorResponse(err, response))
    .finally(() => sendResponse(res, response));
};

const partialUpdateOne = function (req, res) {
  const id = getId(req);
  const response = createResponse();
  SkincareProductModel.findById(id)
    .then((productFromDB) => _checkProductExists(productFromDB))
    .then((foundProduct) => _partialSkincareFill(req, foundProduct))
    .then((updatedProduct) => _saveProduct(updatedProduct))
    .then((savedProduct) => setResponse(response, process.env.OK_STATUS_CODE, savedProduct))
    .catch((err) => setErrorResponse(err, response))
    .finally(() => sendResponse(res, response));
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateOne: fullUpdateOne,
  partialUpdateOne,
};
