import { IconLock } from "@tabler/icons-react";
import { BADGE_ICONS } from "../data/mockData";
import { getBadgeMedalClassName } from "../utils/badgeStyles";

interface AchievementBadgeProps {
  icon: string;
  label: string;
  color: string;
  unlocked: boolean;
  description?: string;
}

export function AchievementBadge({ icon, label, color, unlocked, description }: AchievementBadgeProps) {
  const medalClass = getBadgeMedalClassName(color);
  const Icon = BADGE_ICONS[icon];

  if (!unlocked) {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="absolute -top-1 -right-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#998e84]">
            <IconLock size={12} className="text-white" />
          </div>
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-3 border-dashed border-[#d7cec4] bg-[#f3efe9]">
            {Icon && <Icon size={28} className="grayscale opacity-30" />}
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-[#9a9188]" style={{ fontWeight: 600 }}>{label}</p>
          {description && <p className="mt-0.5 text-xs text-[#a79d93]">{description}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <div className="absolute -top-1 -right-1 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-brand-primary-strong">
          <span className="text-white text-xs">✓</span>
        </div>
        <div
          className={`flex h-20 w-20 items-center justify-center rounded-full border-3 border-white ${medalClass}`}
          style={{ borderWidth: 3 }}
        >
          {Icon && <Icon size={28} stroke={1.5} className="text-white drop-shadow-md" />}
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-[#584d45]" style={{ fontWeight: 700 }}>{label}</p>
        {description && <p className="mt-0.5 text-xs text-[#8d8379]">{description}</p>}
      </div>
    </div>
  );
}
