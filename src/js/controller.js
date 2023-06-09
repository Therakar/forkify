import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // obtain the recipe's id
    const id = window.location.hash.slice(1);

    if (!id) return; // guard clause, if there's not an id return.

    recipeView.renderSpinner();

    // 1. Loading Recipe
    await model.loadRecipe(id);

    // 2. Rendering Recipe
    recipeView.render(model.state.recipe);

    //recipe's markup
  } catch (err) {
    recipeView.renderError();
  }
};

//handling of the event
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
