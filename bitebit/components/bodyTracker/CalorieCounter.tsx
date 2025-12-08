"use client";

import { useState } from "react";

export default function CalorieCounter() {
  const [form, setForm] = useState({
    age: "",
    height: "",
    weight: "",
    activity: "",
  });

  const fields = [
    { label: "Age", key: "age", placeholder: "years" },
    { label: "Height", key: "height", placeholder: "cm" },
    { label: "Weight", key: "weight", placeholder: "kg" },
  ];

  const activityLevels = [
    { label: "Sedentary (little exercise)", value: 1.2 },
    { label: "Light Activity", value: 1.375 },
    { label: "Moderate Activity", value: 1.55 },
    { label: "Very Active", value: 1.725 },
    { label: "Extra Active", value: 1.9 },
  ];

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const calculateCalories = () => {
    const { age, height, weight, activity } = form;

    if (!age || !height || !weight || !activity) {
      alert("Please fill all fields");
      return;
    }

    // Mifflin-St Jeor Formula (male example)
    const bmr =
      10 * Number(weight) +
      6.25 * Number(height) -
      5 * Number(age) +
      5;

    const totalCalories = Math.round(bmr * Number(activity));

    alert(`Your daily calorie requirement: ${totalCalories} kcal`);
  };

  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm mt-4 mb-6 text-black flex flex-col space-y-5 items-center">

      {/* Auto-generated Inputs */}
      {fields.map((field) => (
        <div key={field.key} className="flex flex-row items-center space-x-5 w-[50%]">
          <label className="w-16">{field.label}</label>
          <input
            type="number"
            value={form[field.key as keyof typeof form]}
            onChange={(e) => handleChange(field.key, e.target.value)}
            className="w-full border rounded-lg p-2 border-black text-gray-700"
            placeholder={field.placeholder}
          />
        </div>
      ))}

      {/* Activity Dropdown */}
      <div className="flex flex-row items-center space-x-5 w-[50%]">
        <label className="w-16">Activity</label>
        <select
          value={form.activity}
          onChange={(e) => handleChange("activity", e.target.value)}
          className="w-full border rounded-lg p-2 border-black text-gray-700"
        >
          <option value="">Select activity</option>
          {activityLevels.map((lvl) => (
            <option key={lvl.value} value={lvl.value}>
              {lvl.label}
            </option>
          ))}
        </select>
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculateCalories}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 mt-3"
      >
        Calculate
      </button>
    </div>
  );
}
