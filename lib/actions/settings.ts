"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSettings(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Não autorizado");
  }

  const defaultWhatsapp = (formData.get("defaultWhatsapp") as string) || "";

  const existing = await prisma.settings.findFirst();
  if (existing) {
    await prisma.settings.update({
      where: { id: existing.id },
      data: { defaultWhatsapp },
    });
  } else {
    await prisma.settings.create({ data: { defaultWhatsapp } });
  }

  revalidatePath("/admin/settings");
  return { success: true };
}