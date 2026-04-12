type BadgeFamily = "brand" | "accent" | "earth" | "warm";

const COLOR_FAMILY_MAP: Record<string, BadgeFamily> = {
  green: "brand",
  teal: "brand",
  amber: "accent",
  orange: "accent",
  blue: "earth",
  indigo: "earth",
  purple: "warm",
  pink: "warm",
  red: "warm",
};

export function getBadgeFamily(color: string): BadgeFamily {
  return COLOR_FAMILY_MAP[color] ?? "brand";
}

export function getBadgeChipClassName(color: string) {
  const family = getBadgeFamily(color);

  switch (family) {
    case "brand":
      return "chip-brand";
    case "accent":
      return "chip-accent";
    case "earth":
      return "chip-earth";
    case "warm":
      return "chip-accent";
    default:
      return "chip-brand";
  }
}

export function getBadgeMedalClassName(color: string) {
  const family = getBadgeFamily(color);

  switch (family) {
    case "brand":
      return "badge-family-brand";
    case "accent":
      return "badge-family-accent";
    case "earth":
      return "badge-family-earth";
    case "warm":
      return "badge-family-warm";
    default:
      return "badge-family-brand";
  }
}
