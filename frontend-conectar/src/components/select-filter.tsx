// components/ui/select-filter.tsx
import React from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectFilterProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SelectFilter: React.FC<SelectFilterProps> = ({
  options,
  value,
  onChange,
  placeholder = "Selecione",
  className = "",
}) => {
  return (
    <select
      className={`border border-gray-300 rounded px-3 py-2 text-sm ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
