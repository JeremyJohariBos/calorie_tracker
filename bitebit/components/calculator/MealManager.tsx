"use client";

import { useState } from "react";
import NutrientSelector from "./NutrientSelector";
import CalorieInput from "./CalorieInput";

export default function MealManager() {
  const [selectedNutrients, setSelectedNutrients] = useState<string[]>([]);
  const [currentMeal, setCurrentMeal] = useState<any>({});
  const [meals, setMeals] = useState<any[]>([]);

  const addMeal = () => {
    if (!currentMeal.name) return alert("Please enter a meal name");

    setMeals([...meals, currentMeal]);
    setCurrentMeal({}); // reset input section
  };

  // Calculate totals dynamically
  const totals: Record<string, number> = {};

  selectedNutrients.forEach((nutrient) => {
    totals[nutrient] = meals.reduce((sum, meal) => {
      const value = Number(meal[nutrient] || 0);
      return sum + value;
    }, 0);
  });

  return (
    <div className="max-w-xl mx-auto mt-6 space-y-6">
      
      {/* 1. Nutrient Selection */}
      <NutrientSelector 
        onChange={(selected) => {
          setSelectedNutrients(selected);
          setMeals([]); // optional: reset meals when changing fields
        }}
      />

      {/* 2. Meal Input Section */}
      {selectedNutrients.length > 0 && (
        <CalorieInput 
          nutrients={selectedNutrients} 
          onChange={(data) => setCurrentMeal(data)} 
        />
      )}

      {/* Add button */}
      {selectedNutrients.length > 0 && (
        <button
          onClick={addMeal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500"
        >
          Add Meal
        </button>
      )}

      {/* 3. Display Meals */}
      {meals.length > 0 && (
        <div className="p-4 border rounded-xl bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-3">Meals Added</h3>

          <div className="space-y-2">
            {meals.map((meal, idx) => (
              <div 
                key={idx}
                className="p-2 border rounded-lg bg-gray-50"
              >
                <div className="font-medium">{meal.name}</div>

                <div className="text-sm text-gray-600">
                  {selectedNutrients.map((n) => (
                    <div key={n}>
                      {n}: {meal[n] || 0}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Display Totals */}
      {meals.length > 0 && (
        <div className="p-4 border rounded-xl bg-blue-50">
          <h3 className="text-lg font-semibold mb-2">Daily Totals</h3>

          {selectedNutrients.map((nutrient) => (
            <div key={nutrient} className="text-sm">
              <strong>{nutrient}:</strong> {totals[nutrient]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
