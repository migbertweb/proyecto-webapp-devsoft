import Link from "next/link";
import { MapPin, Heart, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900">
                DevSoft Turismo
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Descubra o melhor de cada cidade. Explore pontos turísticos,
              restaurantes e experiências únicas.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Navegação</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-brand-violet transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-brand-violet transition-colors flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5" /> Favoritos
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-brand-violet transition-colors">
                  Entrar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Contato</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <a href="mailto:contato@devsoft.com.br" className="hover:text-brand-violet transition-colors">
                  contato@devsoft.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
          &copy; {year} DevSoft Turismo. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}