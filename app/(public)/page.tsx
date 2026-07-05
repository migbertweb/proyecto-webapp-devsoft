import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { HomeClient } from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await auth();

  const cities = await prisma.city.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });

  const cookieStore = await cookies();
  const cityId = cookieStore.get("current-city-id")?.value || null;

  const items = await prisma.travelItem.findMany({
    where: {
      active: true,
      ...(cityId ? { cityId } : {}),
    },
    include: { city: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  const allItems = await prisma.travelItem.findMany({
    where: { active: true },
    include: { city: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  let favoriteIds: string[] = [];
  if (session?.user?.id) {
    const favs = await prisma.favorite.findMany({
      where: { userId: session.user.id },
      select: { itemId: true },
    });
    favoriteIds = favs.map((f) => f.itemId);
  }

  return (
    <HomeClient
      cities={cities}
      items={items}
      allItems={allItems}
      currentCityId={cityId}
      favoriteIds={favoriteIds}
    />
  );
}