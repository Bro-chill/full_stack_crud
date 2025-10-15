import type { LucideIcon } from "lucide-react";

interface IconButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  variant?: "primary" | "danger" | "secondary";
  title?: string;
}

export default function IconButton({
  icon: Icon,
  onClick,
  variant = "primary",
  title,
}: IconButtonProps) {
  const variantClasses = {
    primary: "text-[#00ffff] hover:text-[#00cccc] hover:bg-[#00ffff]/10 border-[#00ffff]",
    danger: "text-[#ff00ff] hover:text-[#cc00cc] hover:bg-[#ff00ff]/10 border-[#ff00ff]",
    secondary: "text-[#9ca3af] hover:text-[#e0e7ff] hover:bg-[#2d3561] border-[#6b7280]",
  };

  return (
    <button
      onClick={onClick}
      className={`inline-block p-2 border-2 transition-all mr-2 ${variantClasses[variant]}`}
      title={title}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}
