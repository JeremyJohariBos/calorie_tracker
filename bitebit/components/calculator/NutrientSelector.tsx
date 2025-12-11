interface NutrientSelectorProps {
  selected: string[];
  onChange: (v: string[]) => void;
  dailyCalorie: string;
  setDailyCalorie: (v: string) => void;
  savedCalorie: number | null;
  setSavedCalorie: (v: number | null) => void;
}

const nutrients = [
  { key: "calories", label: "Calories (kcal)" },
  { key: "protein", label: "Protein (g)" },
  { key: "sugar", label: "Sugar (g)" },
  { key: "fiber", label: "Fiber (g)" }
];

export default function NutrientSelector({
  selected,
  onChange,
  dailyCalorie,
  setDailyCalorie,
  savedCalorie,
  setSavedCalorie
}: NutrientSelectorProps) {

  const toggle = (key: string) => {
    const updated = selected.includes(key)
      ? selected.filter(x => x !== key)
      : [...selected, key];

    onChange(updated);
  };

  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm flex flex-col">

      <h2 className="font-semibold text-center mb-3">Daily Calorie Goal</h2>

      <input
        type="number"
        value={dailyCalorie}
        onChange={(e) => setDailyCalorie(e.target.value)}
        disabled={savedCalorie !== null}
        className="border rounded-lg p-2 w-full disabled:bg-gray-200 text-gray-700 m-auto"
        placeholder="Enter calories"
      />

      <div className="mt-3 text-center">
        {savedCalorie === null ? (
          <button
            onClick={() => {
              if (!dailyCalorie) return alert("Enter calories");
              setSavedCalorie(Number(dailyCalorie));
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => {
              setSavedCalorie(null);
              setDailyCalorie("");
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Reset
          </button>
        )}
      </div>

      <h2 className="font-semibold text-center mt-6 mb-3">
        Nutrients to Track
      </h2>

      <div className="flex flex-wrap">
        {nutrients.map((n) => (
          <label key={n.key} className="flex items-center justify-center ">
            <input
              type="checkbox"
              checked={selected.includes(n.key)}
              onChange={() => toggle(n.key)}
              className="w-[50px]"
            />
            {n.label}
          </label>
        ))}
      </div>
    </div>
  );
}
