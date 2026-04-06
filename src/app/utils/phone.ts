export function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (digits.length === 10 || digits.length === 11) {
    return `55${digits}`;
  }

  return digits;
}

export function formatPhoneForDisplay(phone: string) {
  const digits = normalizePhone(phone);

  if (digits.length < 12) {
    return phone;
  }

  const countryCode = digits.slice(0, digits.length - 11);
  const localNumber = digits.slice(-11);
  const ddd = localNumber.slice(0, 2);
  const prefix = localNumber.slice(2, 7);
  const suffix = localNumber.slice(7);

  return `+${countryCode} (${ddd}) ${prefix}-${suffix}`;
}

export function formatPhoneForMask(phone: string) {
  const digits = normalizePhone(phone);

  if (digits.length < 12) {
    return phone;
  }

  const countryCode = digits.slice(0, digits.length - 11);
  const localNumber = digits.slice(-11);
  const ddd = localNumber.slice(0, 2);
  const prefix = localNumber.slice(2, 7);
  const suffix = localNumber.slice(7);

  return `+${countryCode} (${ddd}) ${prefix.slice(0, 2)}***-${suffix}`;
}
