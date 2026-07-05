"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleFavorite(itemId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Não autenticado" };

  const existing = await prisma.favorite.findUnique({
    where: {
      userId_itemId: {
        userId: session.user.id,
        itemId,
      },
    },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
  } else {
    await prisma.favorite.create({
      data: { userId: session.user.id, itemId },
    });
  }

  revalidatePath("/favorites");
  revalidatePath("/");
  return { success: true };
}

export async function isFavorited(itemId: string): Promise<boolean> {
  const session = await auth();
  if (!session?.user?.id) return false;

  const fav = await prisma.favorite.findUnique({
    where: {
      userId_itemId: {
        userId: session.user.id,
        itemId,
      },
    },
  });

  return !!fav;
}