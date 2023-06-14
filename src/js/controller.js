import { API_URL } from './config.js';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';

// if (module.hot) {
//   module.hot.accept();
// }

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
    recipeView.renderError(`${API_URL}?search=pizza`);
  }
};

const controlSearchResults = async function () {
  try {
    //renders spinner on resultsView
    resultsView.renderSpinner();

    // 1. Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load search results
    await model.loadSearchResults(query);

    // 3. Render results
    resultsView.render(model.getSearchResultsPage());
  } catch (err) {
    console.log(err);
  }
};

//handling of the event
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
