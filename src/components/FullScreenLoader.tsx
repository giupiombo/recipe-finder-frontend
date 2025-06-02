import React from 'react';
import { ChefHat, CookingPot, Wine } from 'lucide-react';

interface FullScreenLoaderProps {
  type: 'search' | 'steps' | 'drinks';
}

const iconMap = {
  search: ChefHat,
  steps: CookingPot,
  drinks: Wine,
};

const messageMap = {
  search: 'Searching delicious recipes...',
  steps: 'Gathering cooking steps...',
  drinks: 'Pairing the perfect drink...',
};

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ type }) => {
  const Icon = iconMap[type];

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-transparent backdrop-blur-sm">
      <Icon className="w-12 h-12 text-blue-500 animate-[spin_3s_linear_infinite] mb-4" />
      <p className="mt-2 text-gray-600 text-sm text-center px-4">
        {messageMap[type]}
      </p>
    </div>
  );
};

export default FullScreenLoader;
