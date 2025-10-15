interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-[#1a1f3a] border-2 border-[#ff00ff] text-[#ff00ff] px-6 py-4 mb-6 shadow-lg shadow-pink-500/20">
      <div className="flex items-center gap-3">
        <span className="text-2xl">⚠</span>
        <div>
          <p className="font-bold tracking-wider uppercase">&gt; ERROR</p>
          <p className="text-sm mt-1 font-mono">{message}</p>
        </div>
      </div>
    </div>
  );
}
