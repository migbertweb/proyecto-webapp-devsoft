"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { toggleFavorite } from "@/lib/actions/favorites";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function FavoriteButton({
  itemId,
  initialFavorited = false,
  className = "",
}: {
  itemId: string;
  initialFavorited?: boolean;
  className?: string;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [favorited, setFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user) {
      router.push("/login");
      return;
    }

    setLoading(true);
    await toggleFavorite(itemId);
    setFavorited(!favorited);
    setLoading(false);
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`p-2 rounded-full transition-all ${
        favorited
          ? "bg-red-50 text-brand-red"
          : "bg-white/80 text-gray-600 hover:bg-white hover:text-brand-red"
      } ${className}`}
      title={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      <Heart
        className={`w-5 h-5 ${favorited ? "fill-current" : ""} ${
          loading ? "animate-pulse" : ""
        }`}
      />
    </button>
  );
}