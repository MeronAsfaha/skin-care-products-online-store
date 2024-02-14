const mongoose = require('mongoose');

const activeIngredientsSchema = new mongoose.Schema({
  name: String,
  ingredientType: {
    type:String
  },
  benefits: String,
});

const skincareProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  manufacturer: String,
  skinType: String,
  activeIngredients: [activeIngredientsSchema],
});

mongoose.model(process.env.SKINCARE_PRODUCT_MODEL, skincareProductSchema, process.env.SKINCARE_COLLECTION);