import React from "react";

interface LoaderProps {
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ message = "Cargando..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
      <p className="text-gray-600 mt-2">{message}</p>
    </div>
  );
};
