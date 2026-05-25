import { useCallback, useMemo, useState } from "react";

function extractDigits(value: string): string {
  return value.replace(/\D/g, "");
}

function applyMask(digits: string): string {
  if (digits.length <= 2) {
    return digits.length > 0 ? `(${digits}` : "";
  }

  const ddd = digits.slice(0, 2);

  if (digits.length <= 7) {
    return `(${ddd}) ${digits.slice(2)}`;
  }

  const isCellphone = digits.length > 10 || (digits.length === 10 && digits[2] === "9");

  if (isCellphone) {
    if (digits.length <= 7) {
      return `(${ddd}) ${digits.slice(2, 7)}`;
    }
    return `(${ddd}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  }

  return `(${ddd}) ${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
}

export function usePhoneInput(initialValue = "") {
  const [rawDigits, setRawDigits] = useState(() => extractDigits(initialValue));
  const [touched, setTouched] = useState(false);

  const maskedValue = useMemo(() => applyMask(rawDigits), [rawDigits]);

  const isValid = useMemo(() => {
    return rawDigits.length === 10 || rawDigits.length === 11;
  }, [rawDigits]);

  const validationError = useMemo(() => {
    if (!touched || rawDigits.length === 0) return null;
    if (isValid) return null;
    return "Telefone inválido. Digite DDD + número (10 ou 11 dígitos).";
  }, [touched, rawDigits, isValid]);

  const handleChange = useCallback((inputValue: string) => {
    const digits = extractDigits(inputValue).slice(0, 11);
    setRawDigits(digits);
  }, []);

  const handleBlur = useCallback(() => {
    setTouched(true);
  }, []);

  const reset = useCallback(() => {
    setRawDigits("");
    setTouched(false);
  }, []);

  return {
    maskedValue,
    rawDigits,
    isValid,
    touched,
    validationError,
    handleChange,
    handleBlur,
    reset,
  };
}
