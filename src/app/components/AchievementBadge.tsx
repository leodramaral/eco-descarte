interface AchievementBadgeProps {
  icon: string;
  label: string;
  color: string;
  unlocked: boolean;
  description?: string;
}

export function AchievementBadge({ icon, label, color, unlocked, description }: AchievementBadgeProps) {
  const colorClasses = {
    green: {
      bg: 'bg-gradient-to-br from-green-400 to-green-600',
      glow: 'shadow-lg shadow-green-300/50',
      border: 'border-green-200',
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-400 to-blue-600',
      glow: 'shadow-lg shadow-blue-300/50',
      border: 'border-blue-200',
    },
    amber: {
      bg: 'bg-gradient-to-br from-amber-400 to-amber-600',
      glow: 'shadow-lg shadow-amber-300/50',
      border: 'border-amber-200',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-400 to-purple-600',
      glow: 'shadow-lg shadow-purple-300/50',
      border: 'border-purple-200',
    },
    red: {
      bg: 'bg-gradient-to-br from-red-400 to-red-600',
      glow: 'shadow-lg shadow-red-300/50',
      border: 'border-red-200',
    },
    teal: {
      bg: 'bg-gradient-to-br from-teal-400 to-teal-600',
      glow: 'shadow-lg shadow-teal-300/50',
      border: 'border-teal-200',
    },
    pink: {
      bg: 'bg-gradient-to-br from-pink-400 to-pink-600',
      glow: 'shadow-lg shadow-pink-300/50',
      border: 'border-pink-200',
    },
    indigo: {
      bg: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
      glow: 'shadow-lg shadow-indigo-300/50',
      border: 'border-indigo-200',
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-400 to-orange-600',
      glow: 'shadow-lg shadow-orange-300/50',
      border: 'border-orange-200',
    },
  };

  const colorClass = colorClasses[color as keyof typeof colorClasses] || colorClasses.green;

  if (!unlocked) {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center z-10">
            <span className="text-white text-xs">🔒</span>
          </div>
          <div className="w-20 h-20 rounded-full border-3 border-dashed border-gray-300 bg-gray-100 flex items-center justify-center">
            <span className="text-3xl grayscale opacity-30">{icon}</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400" style={{ fontWeight: 600 }}>{label}</p>
          {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white z-10">
          <span className="text-white text-xs">✓</span>
        </div>
        <div
          className={`w-20 h-20 rounded-full border-3 border-white ${colorClass.bg} ${colorClass.glow} flex items-center justify-center`}
          style={{ borderWidth: 3 }}
        >
          <span className="text-3xl filter drop-shadow-md">{icon}</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-700" style={{ fontWeight: 700 }}>{label}</p>
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>
    </div>
  );
}
