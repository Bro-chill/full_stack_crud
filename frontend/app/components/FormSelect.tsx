interface FormSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
}

export default function FormSelect({
  label,
  value,
  onChange,
  options,
  required = false,
  placeholder = "Choose an option...",
}: FormSelectProps) {
  return (
    <div>
      <label className="block text-sm font-bold text-[#00ffff] mb-2 tracking-wider uppercase">
        &gt; {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-3 bg-[#1a1f3a] border-2 border-[#2d3561] text-[#e0e7ff] font-mono focus:border-[#00ffff] focus:shadow-lg focus:shadow-cyan-500/30 transition-all"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-[#1a1f3a]">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
