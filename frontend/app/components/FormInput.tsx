interface FormInputProps {
  label: string;
  type?: string;
  value: string | number;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export default function FormInput({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder,
  min,
  max,
  disabled = false,
}: FormInputProps) {
  // Convert value to string, handle NaN case
  const displayValue = typeof value === 'number' && !isNaN(value) ? value.toString() : value;
  
  return (
    <div>
      <label className="block text-sm font-bold text-[#00ffff] mb-2 tracking-wider uppercase">
        &gt; {label}
      </label>
      <input
        type={type}
        value={displayValue}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
        disabled={disabled}
        className={`
          w-full px-4 py-3 bg-[#1a1f3a] border-2 border-[#2d3561] text-[#e0e7ff]
          font-mono focus:border-[#00ffff] focus:shadow-lg focus:shadow-cyan-500/30
          transition-all placeholder-[#6b7280]
          ${disabled ? 'opacity-50 cursor-not-allowed bg-[#0a0e27]' : ''}
        `}
      />
    </div>
  );
}
