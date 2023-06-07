import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
    alert(err);
  }
};

/* When I have to asign the same function to different event listeners
 I can put the events in an array and use forEach */

// It launches controlRecipes() on the page load and every time the hash changes
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
