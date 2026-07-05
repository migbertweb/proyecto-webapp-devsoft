"use client";

import { ItemCard } from "@/components/items/ItemCard";
import { EmptyState } from "@/components/empty/EmptyState";
import { Heart } from "lucide-react";
import type { Favorite, TravelItem, City } from "@prisma/client";

type FavoriteWithItem = Favorite & {
  item: TravelItem & { city: City };
};

export function FavoritesClient({
  favorites,
}: {
  favorites: FavoriteWithItem[];
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
          <Heart className="w-5 h-5 text-brand-red fill-current" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meus Favoritos</h1>
          <p className="text-sm text-gray-500">
            {favorites.length} {favorites.length === 1 ? "item salvo" : "itens salvos"}
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Nenhum favorito ainda"
          description="Explore os conteúdos e salve seus favoritos para acessar depois."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((fav) => (
            <ItemCard
              key={fav.id}
              id={fav.item.id}
              title={fav.item.title}
              image={fav.item.image}
              category={fav.item.category}
              cityName={fav.item.city.name}
              price={fav.item.price}
              favorited
            />
          ))}
        </div>
      )}
    </div>
  );
}