export default function LoadingSpinner() {
  return (
    <div className="text-center py-12">
      <div className="inline-block relative">
        <div className="w-16 h-16 border-4 border-[#2d3561] border-t-[#00ffff] rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-[#00ffff] rounded-full animate-spin blur-sm"></div>
      </div>
      <p className="mt-4 text-[#00ffff] font-bold tracking-wider uppercase animate-pulse">
        &gt; LOADING...
      </p>
    </div>
  );
}
