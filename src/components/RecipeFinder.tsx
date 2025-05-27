import React, { useState } from 'react';
import { searchRecipes, getRecipe, getDrinkRecommendations } from '../api';
import RecipeSearchForm from './RecipeSearchForm';
import RecipeDetailsForm from './RecipeDetailsForm';

const RecipeFinder: React.FC = () => {
  const [ingredients, setIngredients] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [culinary, setCulinary] = useState('');
  const [results, setResults] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [recipeSteps, setRecipeSteps] = useState<string | null>(null);
  const [drinkRecommendations, setDrinkRecommendations] = useState<
    string | null
  >(null);
  const [chosenRecipe, setChosenRecipe] = useState('');
  const [page, setPage] = useState<'results' | 'steps' | 'drinks' | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setRecipeSteps(null);
    setDrinkRecommendations(null);
    setPage(null);
    try {
      const res = await searchRecipes(
        'en',
        ingredients,
        dietaryRestrictions,
        culinary
      );
      setResults(res);
      setPage('results');
    } catch (error) {
      console.error('Error searching recipes:', error);
      setResults('Failed to fetch recipes.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetRecipe = async (recipe: string) => {
    if (!results) return;
    setLoading(true);
    try {
      const res = await getRecipe('en', recipe, results);
      setRecipeSteps(res);
      setPage('steps');
    } catch (error) {
      console.error('Error getting recipe:', error);
      setRecipeSteps('Failed to fetch recipe details.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetDrinks = async (recipe: string) => {
    if (!results) return;
    setLoading(true);
    try {
      const res = await getDrinkRecommendations('en', recipe, results);
      setDrinkRecommendations(res);
      setPage('drinks');
    } catch (error) {
      console.error('Error getting drinks:', error);
      setDrinkRecommendations('Failed to fetch drink recommendations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Title */}
      <header className="py-4 text-center bg-white z-10">
        <h1 className="text-3xl font-bold text-blue-600">🍽️ Recipe Finder</h1>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full">
        {/* Left Panel */}
        <aside className="w-full md:w-1/2 p-6 bg-white">
          <RecipeSearchForm
            ingredients={ingredients}
            dietaryRestrictions={dietaryRestrictions}
            culinary={culinary}
            onIngredientsChange={setIngredients}
            onDietaryRestrictionsChange={setDietaryRestrictions}
            onCulinaryChange={setCulinary}
            onSearch={handleSearch}
            loading={loading}
          />
        </aside>

        {/* Right Panel */}
        <section className="w-full md:w-1/2 p-6 bg-gray-50 md:h-[calc(100vh-4rem)] md:overflow-y-auto">
          {/* Tabs for page navigation */}
          <div className="flex gap-4 mb-4">
            {results && (
              <button
                onClick={() => setPage('results')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  page === 'results'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Results
              </button>
            )}
            {recipeSteps && (
              <button
                onClick={() => setPage('steps')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  page === 'steps'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Steps
              </button>
            )}
            {drinkRecommendations && (
              <button
                onClick={() => setPage('drinks')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  page === 'drinks'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Drinks
              </button>
            )}
          </div>

          {/* Dynamic content based on page */}
          {!page && (
            <div className="text-center text-gray-400 italic">
              Search for a recipe to begin...
            </div>
          )}

          {page === 'results' && results && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Results:</h2>
              <div
                className="prose prose-sm mb-4"
                dangerouslySetInnerHTML={{
                  __html: results
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n/g, '<br />'),
                }}
              />
              <RecipeDetailsForm
                chosenRecipe={chosenRecipe}
                onChosenRecipeChange={setChosenRecipe}
                onSubmit={() => handleGetRecipe(chosenRecipe)}
                loading={loading}
              />
            </div>
          )}

          {page === 'steps' && recipeSteps && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Recipe Steps:</h2>
              <div
                className="prose prose-sm"
                dangerouslySetInnerHTML={{
                  __html: recipeSteps
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/(?<!\*)\*(?!\*)(.*?)(?=\n|$)/g, '• $1')
                    .replace(/\n/g, '<br />'),
                }}
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    if (drinkRecommendations) {
                      setPage('drinks');
                    } else {
                      handleGetDrinks(chosenRecipe);
                    }
                  }}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md"
                >
                  🍷 Get Drink Recommendations
                </button>
              </div>
            </div>
          )}

          {page === 'drinks' && drinkRecommendations && (
            <div>
              <h2 className="text-xl font-semibold mb-2 text-purple-800">
                Drink Recommendations:
              </h2>
              <div
                className="prose prose-sm"
                dangerouslySetInnerHTML={{
                  __html: drinkRecommendations
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n/g, '<br />'),
                }}
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default RecipeFinder;
