import React from 'react';

type Props = {
  ingredients: string;
  dietaryRestrictions: string;
  culinary: string;
  tools: string;
  onIngredientsChange: (value: string) => void;
  onDietaryRestrictionsChange: (value: string) => void;
  onCulinaryChange: (value: string) => void;
  onToolsChange: (value: string) => void;
  onSearch: () => void;
  loading: boolean;
};

const RecipeSearchForm: React.FC<Props> = ({
  ingredients,
  dietaryRestrictions,
  culinary,
  tools,
  onIngredientsChange,
  onDietaryRestrictionsChange,
  onCulinaryChange,
  onToolsChange,
  onSearch,
  loading,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-2xl shadow-lg"
    >
      <div>
        <label className="block font-medium text-gray-700">Ingredients</label>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => onIngredientsChange(e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-md p-2"
          placeholder="e.g., chicken, tomatoes"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700">
          Dietary Restrictions
        </label>
        <input
          type="text"
          value={dietaryRestrictions}
          onChange={(e) => onDietaryRestrictionsChange(e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-md p-2"
          placeholder="e.g., gluten-free, vegan"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700">Culinary</label>
        <input
          type="text"
          value={culinary}
          onChange={(e) => onCulinaryChange(e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-md p-2"
          placeholder="e.g., Italian, Indian"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700">Tools</label>
        <input
          type="text"
          value={tools}
          onChange={(e) => onToolsChange(e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-md p-2"
          placeholder="e.g., Air Fryer, Instant Pot"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        {loading ? 'Searching...' : 'Search Recipes'}
      </button>
    </form>
  );
};

export default RecipeSearchForm;
