import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Translate text
export async function translateText(language: string, text: string) {
  const response = await api.post('/translate', { language, text });
  return response.data.result;
}

// Search recipes
export async function searchRecipes(
  language: string,
  ingredients: string,
  dietary_restrictions: string,
  culinary: string
) {
  const response = await api.post('/search-recipes', {
    language,
    ingredients,
    dietary_restrictions,
    culinary,
  });
  return response.data.result;
}

// Get recipe details
export async function getRecipe(
  language: string,
  chosen_recipe: string,
  recipe_list: string
) {
  const response = await api.post('/give-recipe', {
    language,
    chosen_recipe,
    recipe_list,
  });
  return response.data.result;
}

// Get drink recommendations
export async function getDrinkRecommendations(
  language: string,
  chosen_recipe: string,
  recipe_list: string
) {
  const response = await api.post('/drink-recommendations', {
    language,
    chosen_recipe,
    recipe_list,
  });
  return response.data.result;
}
