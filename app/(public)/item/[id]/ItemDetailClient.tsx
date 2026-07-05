"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Tag, DollarSign, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { FavoriteButton } from "@/components/items/FavoriteButton";
import { CATEGORY_LABELS, type Category } from "@/lib/categories";
import { formatPrice, parseGallery } from "@/lib/utils";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { City, TravelItem } from "@prisma/client";

type ItemWithCity = TravelItem & { city: City };

export function ItemDetailClient({
  item,
  defaultWhatsapp,
}: {
  item: ItemWithCity;
  defaultWhatsapp: string;
}) {
  const gallery = parseGallery(item.gallery);
  const allImages = [item.image, ...gallery].filter(Boolean) as string[];
  const [currentImage, setCurrentImage] = useState(0);

  const whatsappPhone = item.whatsapp || defaultWhatsapp;
  const whatsappLink = whatsappPhone
    ? buildWhatsAppLink(whatsappPhone, item.title, item.city.name)
    : null;

  function prevImage() {
    setCurrentImage((p) => (p === 0 ? allImages.length - 1 : p - 1));
  }

  function nextImage() {
    setCurrentImage((p) => (p === allImages.length - 1 ? 0 : p + 1));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <MapPin className="w-4 h-4" />
        <span>{item.city.name}</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">{item.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Banner */}
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-gray-100">
            {allImages.length > 0 ? (
              <>
                <Image
                  src={allImages[currentImage]}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority
                />
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {allImages.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImage(i)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            i === currentImage ? "bg-white w-6" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <Tag className="w-16 h-16" />
              </div>
            )}
            <div className="absolute top-4 right-4">
              <FavoriteButton itemId={item.id} className="shadow-lg" />
            </div>
          </div>

          {/* Gallery thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    i === currentImage ? "border-brand-violet" : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${item.title} ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-violet-50 text-brand-violet text-xs font-medium">
                {CATEGORY_LABELS[item.category as Category] || item.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin className="w-3.5 h-3.5" />
                {item.city.name} - {item.city.state}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Sobre</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {item.description}
            </p>
          </div>
        </div>

        {/* Sidebar card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-3xl shadow-xl p-6 space-y-5">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4 text-brand-red" />
              <span>
                {item.city.name} - {item.city.state}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Tag className="w-4 h-4 text-brand-violet" />
              <span>{CATEGORY_LABELS[item.category as Category] || item.category}</span>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-brand-red" />
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(item.price)}
              </span>
            </div>

            {whatsappLink ? (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Comprar via WhatsApp
              </a>
            ) : (
              <p className="text-center text-sm text-gray-400">
                WhatsApp não configurado
              </p>
            )}

            <div className="pt-4 border-t border-gray-100">
              <FavoriteButton itemId={item.id} />
              <span className="ml-2 text-sm text-gray-500 align-middle">
                Adicionar aos favoritos
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}