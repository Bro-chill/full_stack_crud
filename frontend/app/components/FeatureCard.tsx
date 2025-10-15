import { Link } from "react-router";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  iconColor: string;
  bgColor: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  link,
  iconColor,
  bgColor,
}: FeatureCardProps) {
  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
    'text-blue-600': { bg: 'bg-[#00ffff]/10', border: 'border-[#00ffff]', text: 'text-[#00ffff]' },
    'text-green-600': { bg: 'bg-[#00ff00]/10', border: 'border-[#00ff00]', text: 'text-[#00ff00]' },
    'text-purple-600': { bg: 'bg-[#ff00ff]/10', border: 'border-[#ff00ff]', text: 'text-[#ff00ff]' },
  };

  const colors = colorMap[iconColor] || colorMap['text-blue-600'];

  return (
    <Link
      to={link}
      className={`block bg-[#1a1f3a] border-2 ${colors.border} p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-current/30 hover:-translate-y-1 group relative overflow-hidden`}
    >
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05)_76%,transparent_77%,transparent)] bg-[length:50px_50px]"></div>
      
      <div className={`${colors.bg} ${colors.text} w-20 h-20 border-2 ${colors.border} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative`}>
        <Icon className="w-12 h-12" />
        <div className={`absolute inset-0 ${colors.bg} blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
      </div>
      
      <h3 className={`text-xl font-bold ${colors.text} mb-3 tracking-wider uppercase`}>
        &gt;&gt; {title}
      </h3>
      <p className="text-[#9ca3af] font-mono text-sm leading-relaxed">
        {description}
      </p>
      
      <div className={`absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 ${colors.border} opacity-50`}></div>
      <div className={`absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 ${colors.border} opacity-50`}></div>
      <div className={`absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 ${colors.border} opacity-50`}></div>
      <div className={`absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 ${colors.border} opacity-50`}></div>
    </Link>
  );
}
