import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: number | string;
  iconColor: string;
  bgColor: string;
}

export default function StatCard({
  icon: Icon,
  title,
  value,
  iconColor,
  bgColor,
}: StatCardProps) {
  const colorMap: Record<string, { border: string; text: string; glow: string }> = {
    'text-blue-600': { border: 'border-[#00ffff]', text: 'text-[#00ffff]', glow: 'shadow-cyan-500/30' },
    'text-green-600': { border: 'border-[#00ff00]', text: 'text-[#00ff00]', glow: 'shadow-green-500/30' },
    'text-purple-600': { border: 'border-[#ff00ff]', text: 'text-[#ff00ff]', glow: 'shadow-pink-500/30' },
    'text-orange-600': { border: 'border-[#ff6b00]', text: 'text-[#ff6b00]', glow: 'shadow-orange-500/30' },
  };

  const colors = colorMap[iconColor] || colorMap['text-blue-600'];

  return (
    <div className={`bg-[#1a1f3a] border-2 ${colors.border} p-6 shadow-xl ${colors.glow} relative overflow-hidden group`}>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-current opacity-5 group-hover:opacity-10 transition-opacity"></div>
      
      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[#9ca3af] font-mono tracking-wider uppercase mb-2">
              &gt; {title}
            </p>
            <p className={`text-4xl font-bold ${colors.text} neon-text tracking-wider`}>
              {value}
            </p>
          </div>
          <div className={`${colors.text} p-4 border-2 ${colors.border} relative`}>
            <Icon className="w-8 h-8 relative z-10" />
            <div className={`absolute inset-0 blur-lg ${colors.text} opacity-50`}></div>
          </div>
        </div>
      </div>
      
      <div className={`absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 ${colors.border} opacity-30`}></div>
      <div className={`absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 ${colors.border} opacity-30`}></div>
    </div>
  );
}
