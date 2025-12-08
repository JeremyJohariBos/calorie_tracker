import { useState } from "react";

interface NutrientSelectorProps {
  onChange: (selected: string[]) => void;
}

//set nutrient choices 
const nutrients = [
  { key: "kcal", label: "Calories (kcal)" },
  { key: "protein", label: "Protein (g)" },
  { key: "sugar", label: "Sugar (g)" },
  { key: "fiber", label: "Fiber (g)" }
]

export default function NutrientSelector({ onChange }: NutrientSelectorProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const tgl = (key: string) => {
    let updated = [];

    if (selected.includes(key)) {
      updated = selected.filter((i) => i !== key);
    } else {
      updated = [...selected, key]
    }

    setSelected(updated);
    onChange(updated); // send to parent
  };

  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-3 text-black">Choose Nutrients to Track</h2>

      <div className="grid grid-cols-2 gap-3">
        {nutrients.map((n) => (
          <label
            key={n.key}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={selected.includes(n.key)}
              onChange={() => tgl(n.key)}
              className="w-4 h-4"
            />
            <span className="text-black">{n.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}