"use client";

import { useState } from "react";

export default function CalorieCounter() {
    const [finalCalories, setFinalCalories] = useState(0);

    const [form, setForm] = useState({
        age: "",
        height: "",
        weight: "",
        gender: "",
        activity: "",
    });

    const fields = [
        { label: "Age", key: "age", placeholder: "years" },
        { label: "Height", key: "height", placeholder: "cm" },
        { label: "Weight", key: "weight", placeholder: "kg" },
    ];

    const genderSelection = [
        { label: "Male" },
        { label: "Female" },
        { label: "Doesn't matter" }
    ]

    const activityLevels = [
        { label: "None", value: 0 },
        { label: "Light Activity - exercise 1-3 times a week", value: 1.375 },
        { label: "Moderate Activity - exercise 4-5 times a week", value: 1.55 },
        { label: "Very Active - daily or 3-4 intense sessions a week", value: 1.725 },
        { label: "Extra Active - daily intense exercises or physical demanding job ", value: 1.9 },
    ];

    const handleChange = (key: string, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const calculateCalories = () => {
        console.log('clicked')
        const { age, height, weight, gender, activity } = form;

        if (!age || !height || !weight || !gender || !activity) {
            alert("Please fill all fields");
            return;
        }

        // Mifflin-St Jeor Formula (male) BMR = (10 × W) + (6.25 × H) – (5 × A) + 5
        // Mifflin-St Jeor Formula (female) BMR = (10 × W) + (6.25 × H) – (5 × A) – 161. 

        const bmr =
            10 * Number(weight) +
            6.25 * Number(height) -
            5 * Number(age);

        const totalCalories = gender === "Female" ? bmr - 161 : bmr + 5 
        const fullCalories = Math.round(totalCalories * Number(activity));
        setFinalCalories(fullCalories);

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
                <label className="w-16">Gender</label>
                <select
                    value={form.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className="w-full border rounded-lg p-2 border-black text-gray-700"
                >
                    <option value="">Gender</option>
                    {genderSelection.map((lvl) => (
                        <option key={lvl.label} value={lvl.label}>
                            {lvl.label}
                        </option>
                    ))}
                </select>
            </div>

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
            <p className="text-center text-gray-600 size-3 w-max"> This calculator uses the Mifflin-St Jeor Formula</p>
            <p>{finalCalories} calories/day</p>
        </div>
    );
}
