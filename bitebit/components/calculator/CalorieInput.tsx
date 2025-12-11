interface Props {
  nutrients: string[];
  meal: any;
  onChange: (v: any) => void;
}

export default function CalorieInput({ nutrients, meal, onChange }: Props) {
  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm">

      {/* Meal name stays alone */}
      <input
        type="text"
        placeholder="Meal name"
        value={meal.name || ""}
        onChange={e => onChange({ ...meal, name: e.target.value })}
        className="border p-2 rounded-lg w-full mb-4"
      />

      {/* Nutrients in 2 columns */}
      <div className="grid grid-cols-2 gap-4">
        {nutrients.map(n => (
          <div key={n} className="flex flex-col">
            <label className="text-sm mb-1">{n}</label>
            <input
              type="number"
              value={meal[n] || ""}
              onChange={(e) => onChange({ ...meal, [n]: e.target.value })}
              className="border p-2 rounded-lg"
            />
          </div>
        ))}
      </div>

    </div>
  );
}
