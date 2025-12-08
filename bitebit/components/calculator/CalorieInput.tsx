import { useState } from "react";

interface MealInputProps {
  nutrients: string[];              // selected nutrients
  onChange?: (mealData: Record<string, any>) => void;
}
export default function MealInput({ nutrients, onChange }: MealInputProps) {
  const [meal, setMeal] = useState<Record<string, any>>({
    name: "",
  });

  const handleChange = (key: string, value: string) => {
    const updated = { ...meal, [key]: value };
    setMeal(updated);
    onChange?.(updated); // safe call
  };

  const nutrientLabels: Record<string, string> = {
    kcal: "Calories (kcal)",
    protein: "Protein (g)",
    sugar: "Sugar (g)",
    fiber: "Fiber (g)",
  };

  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm mt-4 mb-6">
      <h3 className="text-lg font-semibold mb-3 text-black">Enter Meal</h3>

      {/* Name always visible */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-black">Meal Name</label>
        <input
          type="text"
          className="w-full border rounded-lg p-2 border-black text-gray-700"
          value={meal.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="e.g., Chicken Rice"
        />
      </div>

      {/* Dynamic nutrient inputs */}
      <div className="grid grid-cols-2 gap-4">
        {nutrients.map((nutrient) => (
          <div key={nutrient}>
            <label className="block text-sm font-medium mb-1 text-black">
              {nutrientLabels[nutrient] || nutrient}
            </label>

            <input
              type="number"
              className="w-full border rounded-lg p-2 text-black"
              value={meal[nutrient] || ""}
              onChange={(e) => handleChange(nutrient, e.target.value)}
              placeholder="0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
