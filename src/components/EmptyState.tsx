interface EmptyStateProps {
  message: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div className="text-center rounded-xl border border-dashed border-gray-300 bg-white/80 px-6 py-14 max-w-md mx-auto">
      <p className="text-gray-500 text-sm leading-relaxed">{message}</p>
    </div>
  );
};
