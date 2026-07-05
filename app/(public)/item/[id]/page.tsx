import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ItemDetailClient } from "./ItemDetailClient";
import { getDefaultWhatsApp } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

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