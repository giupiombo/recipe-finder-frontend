import React, { useState } from 'react';
import { searchRecipes, getRecipe, getDrinkRecommendations } from '../api';
import RecipeSearchForm from './RecipeSearchForm';
import RecipeDetailsForm from './RecipeDetailsForm';
import FullScreenLoader from './FullScreenLoader';
import ReviewSection from './ReviewSection';

const RecipeFinder: React.FC = () => {
  const [ingredients, setIngredients] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [culinary, setCulinary] = useState('');
  const [tools, setTools] = useState('');
  const [results, setResults] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<
    'search' | 'steps' | 'drinks' | null
  >(null);

  const [recipeSteps, setRecipeSteps] = useState<string | null>(null);
  const [drinkRecommendations, setDrinkRecommendations] = useState<
    string | null
  >(null);
  const [review, setReview] = useState<string | null>(null);
  const [chosenRecipe, setChosenRecipe] = useState('');
  const [page, setPage] = useState<
    'results' | 'steps' | 'drinks' | 'review' | null
  >(null);
  const [reviewCompleted, setReviewCompleted] = useState(false);

  const handleSearch = async () => {
    setLoadingType('search');
    setLoading(true);
    setRecipeSteps(null);
    setDrinkRecommendations(null);
    setReview(null);
    setPage(null);
    try {
      const res = await searchRecipes(
        'en',
        ingredients,
        dietaryRestrictions,
        culinary,
        tools
      );
      setResults(res);
      setPage('results');
    } catch (error) {
      console.error('Error searching recipes:', error);
      setResults('Failed to fetch recipes.');
    } finally {
      setLoading(false);
      setChosenRecipe('');
    }
  };

  const handleGetRecipe = async (recipe: string) => {
    if (!results) return;
    setLoadingType('steps');
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
    setLoadingType('drinks');
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

  const handleFinish = () => {
    setPage('review');
    setReview('review');
  };

  return (
    <div className="md:h-screen flex flex-col md:overflow-hidden">
      {/* Title */}
      <header className="py-8 text-center z-10">
        <h1 className="text-3xl font-bold text-blue-600 tracking-wide">
          🍽️ Recipe Finder
        </h1>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full">
        {/* Left Panel */}
        <aside className="w-full md:w-1/2 px-6 pb-6">
          <RecipeSearchForm
            ingredients={ingredients}
            dietaryRestrictions={dietaryRestrictions}
            culinary={culinary}
            tools={tools}
            onIngredientsChange={setIngredients}
            onDietaryRestrictionsChange={setDietaryRestrictions}
            onCulinaryChange={setCulinary}
            onToolsChange={setTools}
            onSearch={handleSearch}
            loading={loading}
          />
        </aside>

        {/* Right Panel */}
        <section className="w-full md:w-1/2 p-6 bg-white/50 md:bg-white/70 backdrop-blur-md rounded-md md:rounded-2xl min-h-[20vh] md:h-[80vh] md:overflow-y-auto">
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
                💡 Ideas
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
                📋 Steps
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
                🍷 Drinks
              </button>
            )}
            {review && (
              <button
                onClick={() => setPage('review')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  page === 'review'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                ⭐️ Review
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
                    handleGetDrinks(chosenRecipe);
                  }}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md"
                >
                  {loading ? 'Fetching...' : '🍷 Get Drink Recommendations'}
                </button>
              </div>
            </div>
          )}

          {page === 'drinks' && drinkRecommendations && (
            <div>
              <div
                className="prose prose-sm"
                dangerouslySetInnerHTML={{
                  __html: drinkRecommendations
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n/g, '<br />'),
                }}
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleFinish}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md"
                >
                  Finish
                </button>
              </div>
            </div>
          )}

          {page === 'review' && review && (
            <ReviewSection
              reviewCompleted={reviewCompleted}
              setReviewCompleted={setReviewCompleted}
            />
          )}
        </section>
      </main>
      <p className="text-sm my-6 tracking-wider text-center">
        © Copyright {new Date().getFullYear()}. Made with 🩷 by Giulia Piombo.
      </p>
      {loading && loadingType && <FullScreenLoader type={loadingType} />}
    </div>
  );
};

export default RecipeFinder;
