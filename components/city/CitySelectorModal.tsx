"use client";

import { useCity } from "./CityProvider";
import { X, MapPin } from "lucide-react";
import type { City } from "@prisma/client";

export function CitySelectorModal({ cities }: { cities: City[] }) {
  const { showSelector, setShowSelector, setCurrentCity } = useCity();

  if (!showSelector) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative animate-in">
        <button
          onClick={() => setShowSelector(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Escolha seu destino</h2>
          <p className="text-gray-500 mt-2">
            Selecione uma cidade para explorar
          </p>
        </div>

        {cities.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhuma cidade disponível no momento.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => setCurrentCity(city)}
                className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200 hover:border-brand-violet hover:bg-violet-50 transition-all text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-violet to-brand-red flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-brand-violet transition-colors">
                    {city.name}
                  </p>
                  <p className="text-sm text-gray-500">{city.state}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}