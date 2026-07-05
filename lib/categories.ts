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