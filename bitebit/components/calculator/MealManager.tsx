"use client";

import { useEffect, useState } from "react";
import NutrientSelector from "./NutrientSelector";
import CalorieInput from "./CalorieInput";

export default function MealManager() {
  const [selectedNutrients, setSelectedNutrients] = useState<string[]>([]);
  const [currentMeal, setCurrentMeal] = useState<any>({});
  const [meals, setMeals] = useState<any[]>([]);
  const [dailyCalorie, setDailyCalorie] = useState<any>(0);
  const [savedCalorie, setSavedCalorie] = useState<number | null>(null);

  // Load localStorage
  useEffect(() => {
    const storedMeals = localStorage.getItem("meals");
    const storedCal = localStorage.getItem("savedCalorie");

    if (storedMeals) setMeals(JSON.parse(storedMeals));
    if (storedCal) setSavedCalorie(Number(storedCal));
  }, []);

  // Save meals automatically
  useEffect(() => {
    localStorage.setItem("meals", JSON.stringify(meals));
  }, [meals]);

  // Save daily calorie
  useEffect(() => {
    savedCalorie !== null
      ? localStorage.setItem("savedCalorie", String(savedCalorie))
      : localStorage.removeItem("savedCalorie");
  }, [savedCalorie]);

  // Add Meal
  const addMeal = () => {
    if (!currentMeal.name) return alert("Please enter a meal name");
    if (!currentMeal.calories) return alert("Please enter calories");

    if (savedCalorie === null) {
      return alert("Please save your daily calorie goal first.");
    }

    const mealToAdd = { ...currentMeal };

    setMeals(prev => [...prev, mealToAdd]);
    setSavedCalorie(prev => prev! - Number(mealToAdd.calories));
    setCurrentMeal({});
  };

  // Totals
  const totals: Record<string, number> = {};
  selectedNutrients.forEach(n => {
    totals[n] = meals.reduce((sum, m) => sum + Number(m[n] || 0), 0);
  });

  const percentage =
    savedCalorie !== null && dailyCalorie
      ? (savedCalorie / dailyCalorie) * 100
      : 0;


  // ---------------------------------------
  // ⭐ 4-Block Dashboard Layout Starts Here
  // ---------------------------------------
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

      {/* 🔵 (1) TOP LEFT — Nutrient Selector / Daily Cal Input */}
      <div className="p-4 bg-white border rounded-xl shadow-sm">
        <NutrientSelector
          selected={selectedNutrients}
          onChange={setSelectedNutrients}
          dailyCalorie={dailyCalorie}
          setDailyCalorie={setDailyCalorie}
          savedCalorie={savedCalorie}
          setSavedCalorie={setSavedCalorie}
        />
      </div>

      {/* 🔵 (2) TOP RIGHT — Calorie Balance */}
      <div className="p-4 bg-white border rounded-xl shadow-sm">
        {savedCalorie !== null ? (
          <>
            <h3 className="text-lg font-semibold mb-2 text-center">Remaining Calories</h3>
            <p className="text-xl font-bold text-center">{savedCalorie}</p>

            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-2">
              <div
                className={`h-full transition-all duration-300 ${
                  percentage <= 25
                    ? "bg-red-500"
                    : percentage <= 50
                      ? "bg-yellow-400"
                      : "bg-green-500"
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Set your daily calorie goal</p>
        )}
      </div>

      {/* 🔵 (3) BOTTOM LEFT — Meal Input */}
      <div className="p-4 bg-white border rounded-xl shadow-sm">
        {selectedNutrients.length > 0 && (
          <>
            <CalorieInput
              nutrients={selectedNutrients}
              meal={currentMeal}
              onChange={setCurrentMeal}
            />

            <button
              onClick={addMeal}
              className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500"
            >
              Add Meal
            </button>
          </>
        )}
      </div>

      {/* 🔵 (4) BOTTOM RIGHT — Scrollable Meal List */}
      <div className="p-4 bg-white border rounded-xl shadow-sm h-[350px] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-3">Meals Added</h3>

        {meals.length > 0 ? (
          meals.map((meal, idx) => (
            <div key={idx} className="p-2 mb-2 border rounded-lg bg-gray-50">
              <div className="font-medium">{meal.name}</div>
              <div className="text-sm text-gray-600">
                {selectedNutrients.map(n => (
                  <div key={n}>
                    {n}: {meal[n] || 0}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No meals added yet</p>
        )}
      </div>

    </div>
  );
}
