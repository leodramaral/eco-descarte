import { Phone } from "lucide-react";

interface PhoneInputProps {
  maskedValue: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string | null;
  disabled?: boolean;
  className?: string;
}

export function PhoneInput({
  maskedValue,
  onChange,
  onBlur,
  error,
  disabled = false,
  className = "",
}: PhoneInputProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-[#584d45]">
        Telefone <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a9188]" />
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(92) 99123-4567"
          value={maskedValue}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`field-brand w-full rounded-2xl bg-white py-3 pl-10 pr-4 text-sm text-gray-800 ${
            error ? "!border-red-400 focus:!ring-red-400" : ""
          } ${className}`}
          required
          disabled={disabled}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
