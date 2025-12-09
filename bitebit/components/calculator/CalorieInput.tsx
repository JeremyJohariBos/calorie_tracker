interface Props {
  nutrients: string[];
  meal: any;
  onChange: (v: any) => void;
}

export default function CalorieInput({ nutrients, meal, onChange }: Props) {
  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm">

      <input
        type="text"
        placeholder="Meal name"
        value={meal.name || ""}
        onChange={e => onChange({ ...meal, name: e.target.value })}
        className="border p-2 rounded-lg w-full mb-3"
      />

      {nutrients.map(n => (
        <div key={n} className="mb-2">
          <label className="block text-sm">{n}</label>
          <input
            type="number"
            value={meal[n] || ""}
            onChange={(e) => onChange({ ...meal, [n]: e.target.value })}
            className="border p-2 rounded-lg w-full"
          />
        </div>
      ))}

    </div>
  );
}
