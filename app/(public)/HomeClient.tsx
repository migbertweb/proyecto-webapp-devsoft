"use client";

import { useState, useMemo } from "react";
import { useCity } from "@/components/city/CityProvider";
import { ItemCard } from "@/components/items/ItemCard";
import { EmptyState } from "@/components/empty/EmptyState";
import { CATEGORIES, CATEGORY_LABELS, type Category } from "@/lib/categories";
import { Search, MapPin, Compass } from "lucide-react";
import type { City, TravelItem } from "@prisma/client";

type ItemWithCity = TravelItem & { city: City };

export function HomeClient({
  cities,
  items,
  allItems,
  currentCityId,
  favoriteIds,
}: {
  cities: City[];
  items: ItemWithCity[];
  allItems: ItemWithCity[];
  currentCityId: string | null;
  favoriteIds: string[];
}) {
  const { currentCity } = useCity();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const displayCity = currentCity || cities.find((c) => c.id === currentCityId) || null;
  const displayItems = displayCity ? items : allItems;

  const filtered = useMemo(() => {
    let result = displayItems;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.city.name.toLowerCase().includes(q)
      );
    }
    if (selectedCategory) {
      result = result.filter((i) => i.category === selectedCategory);
    }
    return result;
  }, [displayItems, search, selectedCategory]);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-violet via-violet-700 to-brand-red text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Descubra o melhor
              <br />
              <span className="text-yellow-300">de cada cidade</span>
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-lg">
              Explore pontos turísticos, restaurantes, tours e experiências únicas
              {displayCity ? ` em ${displayCity.name}` : " pelo Brasil"}.
            </p>

            <div className="mt-8 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-2 max-w-md border border-white/20">
              <Search className="w-5 h-5 text-white/60 ml-3 flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar experiências..."
                className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-sm py-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !selectedCategory
                ? "bg-brand-violet text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50 shadow-sm"
            }`}
          >
            Todos
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-brand-violet text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50 shadow-sm"
              }`}
            >
              {CATEGORY_LABELS[cat as Category]}
            </button>
          ))}
        </div>
      </section>

      {/* Destinations */}
      {cities.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="flex items-center gap-2 mb-6">
            <Compass className="w-5 h-5 text-brand-red" />
            <h2 className="text-2xl font-bold text-gray-900">Destinos em destaque</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {cities.map((city) => (
              <div
                key={city.id}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-brand-violet/20 to-brand-red/20 group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-lg">{city.name}</p>
                  <p className="text-white/70 text-sm">{city.state}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pb-20">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-5 h-5 text-brand-red" />
          <h2 className="text-2xl font-bold text-gray-900">
            {displayCity
              ? `O que fazer em ${displayCity.name}`
              : "Conteúdos recentes"}
          </h2>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={Search}
            title={
              displayCity
                ? "Nenhum conteúdo disponível para esta cidade."
                : "Nenhum conteúdo disponível no momento."
            }
            description="Tente ajustar os filtros ou selecionar outra cidade."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                category={item.category}
                cityName={item.city.name}
                price={item.price}
                favorited={favoriteIds.includes(item.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}