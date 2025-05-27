import React from 'react';

type Props = {
  chosenRecipe: string;
  onChosenRecipeChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
};

const RecipeDetailsForm: React.FC<Props> = ({
  chosenRecipe,
  onChosenRecipeChange,
  onSubmit,
  loading,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chosenRecipe.trim()) return;
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block font-medium text-gray-700">
        Choose one recipe to get steps:
      </label>
      <input
        type="text"
        value={chosenRecipe}
        onChange={(e) => onChosenRecipeChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2"
        placeholder="e.g., Pasta alla Norma"
      />
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition"
        disabled={loading}
      >
        {loading ? 'Fetching...' : 'Get Recipe Steps'}
      </button>
    </form>
  );
};

export default RecipeDetailsForm;
