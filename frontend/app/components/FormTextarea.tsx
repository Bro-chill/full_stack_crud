interface FormTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

export default function FormTextarea({
  label,
  value,
  onChange,
  required = false,
  placeholder,
  rows = 4,
}: FormTextareaProps) {
  return (
    <div>
      <label className="block text-sm font-bold text-[#00ffff] mb-2 tracking-wider uppercase">
        &gt; {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 bg-[#1a1f3a] border-2 border-[#2d3561] text-[#e0e7ff] font-mono focus:border-[#00ffff] focus:shadow-lg focus:shadow-cyan-500/30 transition-all placeholder-[#6b7280]"
      />
    </div>
  );
}
