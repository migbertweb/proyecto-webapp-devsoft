import {
  MapPin,
  Utensils,
  Compass,
  Package,
  BedDouble,
  Car,
  Star,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const CATEGORIES = [
  "TOURIST_POINT",
  "RESTAURANT",
  "TOUR",
  "PACKAGE",
  "HOTEL",
  "TRANSPORT",
  "EXPERIENCE",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  TOURIST_POINT: "Ponto Turístico",
  RESTAURANT: "Restaurante",
  TOUR: "Tour",
  PACKAGE: "Pacote",
  HOTEL: "Hotel",
  TRANSPORT: "Transporte",
  EXPERIENCE: "Experiência",
};

export const CATEGORY_ICONS: Record<Category, LucideIcon> = {
  TOURIST_POINT: MapPin,
  RESTAURANT: Utensils,
  TOUR: Compass,
  PACKAGE: Package,
  HOTEL: BedDouble,
  TRANSPORT: Car,
  EXPERIENCE: Star,
};