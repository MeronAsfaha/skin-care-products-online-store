export const environment = {
  baseUrl: 'http://localhost:3000/api/',
  homePath: '',
  skincareProducts: 'skincareProducts',
  getOneSkincareProductPath: 'skincareProducts/:skincareId',
  addNewSkincareProductPath: 'skincareProducts/new',
  partialUpdateSkincareProductPath: 'skincareProducts/:skincareId/partialUpdate',
  fullUpdateSkincareProductPath: 'skincareProducts/:skincareId/fullUpdate',
  registerPath: 'register',
  loginPath: 'login',
  skincareId: 'skincareId',
  activeIngredientId: 'activeIngredientId',
  partialUpdateActiveIngredientsPath:
    'skincareProducts/:skincareId/activeIngredients/:activeIngredientId/partialUpdate',
  fullUpdateActiveIngredientPath:
    'skincareProducts/:skincareId/activeIngredients/:activeIngredientId/fullUpdate',
  getActiveIngredientPath:
    'skincareProducts/:skincareId/activeIngredients/:activeIngredientId',
  addActiveIngredientPath: 'skincareProducts/:skincareId/activeIngredients/new',
};
