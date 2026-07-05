import Link from "next/link";
import Image from "next/image";
import { MapPin, Tag } from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";
import { CATEGORY_LABELS, type Category } from "@/lib/categories";
import { formatPrice } from "@/lib/utils";

interface ItemCardProps {
  id: string;
  title: string;
  image: string | null;
  category: string;
  cityName: string;
  price: number;
  favorited?: boolean;
}

export function ItemCard({
  id,
  title,
  image,
  category,
  cityName,
  price,
  favorited = false,
}: ItemCardProps) {
  return (
    <Link
      href={`/item/${id}`}
      className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <Tag className="w-12 h-12" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <FavoriteButton itemId={id} initialFavorited={favorited} />
        </div>
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-brand-violet">
            {CATEGORY_LABELS[category as Category] || category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-brand-violet transition-colors line-clamp-1">
          {title}
        </h3>
        <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
          <MapPin className="w-3.5 h-3.5" />
          <span>{cityName}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-brand-red">
            {formatPrice(price)}
          </span>
        </div>
      </div>
    </Link>
  );
}