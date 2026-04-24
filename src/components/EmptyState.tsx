interface EmptyStateProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-gray-500">
      <p>{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
