const express = require('express');
const router = express.Router();
const skincareController = require('../controllers/skincareProductController');
const activeIngredientsController = require('../controllers/activeIngredientsController');
require('../data/skincare-product-model');

router.route('/')
    .get(skincareController.getAll)
    .post(skincareController.create);

router.route('/:id')
    .get(skincareController.getById)
    .put(skincareController.updateOne)
    .patch(skincareController.partialUpdateOne)
    .delete(skincareController.deleteById);

router.route('/:id/activeIngredients')
    .get(activeIngredientsController.findAllActiveIngredients)
    .post(activeIngredientsController.addActiveIngredient);

router.route('/:id/activeIngredients/:activeIngredientId')
    .get(activeIngredientsController.findOneActiveIngredient)
    .put(activeIngredientsController.updateActiveIngredient)
    .patch(activeIngredientsController.partialUpdateActiveIngredient)
    .delete(activeIngredientsController.deleteActiveIngeredient);
module.exports = router;