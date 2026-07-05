import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ItemDetailClient } from "./ItemDetailClient";
import { getDefaultWhatsApp } from "@/lib/whatsapp";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = await prisma.travelItem.findUnique({
    where: { id },
    include: { city: true },
  });

  if (!item) {
    return { title: "Item não encontrado — DevSoft Turismo" };
  }

  const category = item.category.replace(/_/g, " ").toLowerCase();
  const title = `${item.title} — DevSoft Turismo`;
  const description = `${item.title} — ${category} em ${item.city.name}, ${item.city.state}. ${item.description.slice(0, 150)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: item.image ? [{ url: item.image }] : [],
    },
  };
}

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const item = await prisma.travelItem.findUnique({
    where: { id },
    include: { city: true },
  });

  if (!item || !item.active) notFound();

  const defaultWhatsapp = await getDefaultWhatsApp();

  return <ItemDetailClient item={item} defaultWhatsapp={defaultWhatsapp} />;
}