"use client";

import { useState } from "react";
import BodyTracker from "../bodyTracker/Bodytracker";
import MealManager from "./MealManager";

export default function MealTrackerSection() {
  const [showMeals, setShowMeals] = useState(false);

  return (
    <div className="max-w-xl mx-auto mt-6">
      
      <BodyTracker
        onShowMeals={() => setShowMeals(true)}
        onHideMeals={() => setShowMeals(false)}
      />

      {showMeals && <MealManager />}
    </div>
  );
}
