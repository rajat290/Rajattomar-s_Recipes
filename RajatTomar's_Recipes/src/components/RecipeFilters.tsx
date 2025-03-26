
import React from 'react';
import { Check, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface RecipeFiltersProps {
  dietFilter: string | null;
  setDietFilter: (diet: string | null) => void;
  intolerancesFilter: string | null;
  setIntolerancesFilter: (intolerance: string | null) => void;
}

const dietOptions = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'paleo', label: 'Paleo' },
  { value: 'keto', label: 'Keto' },
  { value: 'gluten-free', label: 'Gluten Free' },
];

const intoleranceOptions = [
  { value: 'dairy', label: 'Dairy' },
  { value: 'egg', label: 'Egg' },
  { value: 'gluten', label: 'Gluten' },
  { value: 'peanut', label: 'Peanut' },
  { value: 'seafood', label: 'Seafood' },
];

const RecipeFilters = ({
  dietFilter,
  setDietFilter,
  intolerancesFilter,
  setIntolerancesFilter
}: RecipeFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <span>Diet</span>
            {dietFilter && (
              <span className="bg-food-green text-white text-xs py-0.5 px-2 rounded-full">
                1
              </span>
            )}
            <ChevronDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Dietary Preferences</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {dietOptions.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={dietFilter === option.value}
              onCheckedChange={() => {
                if (dietFilter === option.value) {
                  setDietFilter(null);
                } else {
                  setDietFilter(option.value);
                }
              }}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
          {dietFilter && (
            <>
              <DropdownMenuSeparator />
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 text-sm h-8"
                onClick={() => setDietFilter(null)}
              >
                Clear Filter
              </Button>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <span>Intolerances</span>
            {intolerancesFilter && (
              <span className="bg-food-green text-white text-xs py-0.5 px-2 rounded-full">
                1
              </span>
            )}
            <ChevronDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Food Intolerances</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {intoleranceOptions.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={intolerancesFilter === option.value}
              onCheckedChange={() => {
                if (intolerancesFilter === option.value) {
                  setIntolerancesFilter(null);
                } else {
                  setIntolerancesFilter(option.value);
                }
              }}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
          {intolerancesFilter && (
            <>
              <DropdownMenuSeparator />
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 text-sm h-8"
                onClick={() => setIntolerancesFilter(null)}
              >
                Clear Filter
              </Button>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default RecipeFilters;
