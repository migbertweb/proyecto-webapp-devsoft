"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F7F4] p-4">
      <div className="text-center">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-red to-red-500 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Algo deu errado
        </h1>
        <p className="text-gray-500 mb-8 max-w-md">
          Ocorreu um erro inesperado. Tente novamente.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-gradient font-medium"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}