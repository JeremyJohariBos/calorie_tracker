import CalorieCounter from "./CalorieCounter";
import { useState } from "react";

interface BodyTrackerProps {
  onShowMeals: () => void;
  onHideMeals: () => void;
}

export default function BodyTracker({ onShowMeals, onHideMeals }: BodyTrackerProps) {
  const [showCounter, setShowCounter] = useState(false);
  const [hideQuestion, setQuestionCounter] = useState(false);

  const showBreakdown = () => {
    setShowCounter(true);
    onHideMeals(); // hide meal manager
  };

  const hideBreakdown = () => {
    setShowCounter(false);
    setQuestionCounter(true);
    onShowMeals(); // show meal manager
  };

  return (
    <>
      <div className={`${hideQuestion ? "hidden" : ""}`}>
        <div className="p-4 border rounded-xl bg-white shadow-sm mt-4 mb-6 text-black">
          <p className="text-center mb-5">Do you require a breakdown for your calorie intake?</p>
          <div className="flex justify-center space-x-5">
            <button
              onClick={showBreakdown}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500"
            >
              Yes Please
            </button>

            <button
              onClick={hideBreakdown}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500"
            >
              No Thanks
            </button>
          </div>
        </div>
      </div>
      {showCounter && <CalorieCounter />}
    </>
  );
}
