/*
This is gonna be the module in 
wich I'll write my entire model
*/

import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    //re-format data object
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    //Temporary error handling
    console.error(`${err} ⚠⚠⚠⚠⚠`);
  }
};
