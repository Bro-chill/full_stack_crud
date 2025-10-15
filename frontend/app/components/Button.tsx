import type { LucideIcon } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  icon?: LucideIcon;
  className?: string;
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  icon: Icon,
  className = "",
}: ButtonProps) {
  const baseClasses = "flex items-center gap-2 px-4 py-2 font-bold tracking-wider transition-all duration-300 retro-button border-2 uppercase";
  
  const variantClasses = {
    primary: "bg-[#00ffff] text-[#0a0e27] border-[#00ffff] hover:shadow-lg hover:shadow-cyan-500/50 shadow-cyan-500/30",
    secondary: "bg-[#2d3561] text-[#e0e7ff] border-[#6b7280] hover:border-[#9ca3af] hover:bg-[#3d4571]",
    danger: "bg-[#ff00ff] text-[#0a0e27] border-[#ff00ff] hover:shadow-lg hover:shadow-pink-500/50 shadow-pink-500/30",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      &gt; {children}
    </button>
  );
}
