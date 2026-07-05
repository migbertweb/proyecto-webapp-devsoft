import Link from "next/link";
import { MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F7F4] p-4">
      <div className="text-center">
        <div className="w-24 h-24 rounded-3xl gradient-brand flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-4xl font-bold">404</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Página não encontrada
        </h1>
        <p className="text-gray-500 mb-8 max-w-md">
          O destino que você procura não existe ou foi removido.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-gradient font-medium"
        >
          <MapPin className="w-4 h-4" />
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}