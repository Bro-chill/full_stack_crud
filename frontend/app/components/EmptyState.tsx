interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="text-center py-16 border-2 border-dashed border-[#2d3561]">
      <div className="text-6xl mb-4 opacity-20">[ ]</div>
      <p className="text-[#6b7280] font-mono tracking-wider uppercase">
        &gt; {message}
      </p>
    </div>
  );
}
