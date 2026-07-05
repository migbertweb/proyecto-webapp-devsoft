import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { FavoritesClient } from "./FavoritesClient";

export const dynamic = "force-dynamic";

export default async function FavoritesPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    include: {
      item: {
        include: { city: true },
      },
    },
    orderBy: { id: "desc" },
  });

  return <FavoritesClient favorites={favorites} />;
}