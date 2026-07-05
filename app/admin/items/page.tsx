import { prisma } from "@/lib/prisma";
import { ItemsClient } from "./ItemsClient";

export default async function AdminItemsPage() {
  const [items, cities] = await Promise.all([
    prisma.travelItem.findMany({
      include: { city: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.city.findMany({ orderBy: { name: "asc" } }),
  ]);

  return <ItemsClient items={items} cities={cities} />;
}