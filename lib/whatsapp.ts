import { prisma } from "@/lib/prisma";
import { sanitizeWhatsApp } from "./utils";

export function buildWhatsAppLink(
  phone: string,
  itemName: string,
  cityName: string
): string {
  const clean = sanitizeWhatsApp(phone);
  const text = encodeURIComponent(
    `Olá! Tenho interesse em *${itemName}* na cidade *${cityName}*.`
  );
  return `https://wa.me/${clean}?text=${text}`;
}

export async function getDefaultWhatsApp(): Promise<string> {
  const settings = await prisma.settings.findFirst();
  return settings?.defaultWhatsapp || "";
}