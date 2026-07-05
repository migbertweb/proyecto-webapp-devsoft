"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Não autorizado");
  }
  return session;
}

const citySchema = z.object({
  name: z.string().min(2),
  state: z.string().min(2),
  image: z.string().optional().nullable(),
  active: z.boolean().default(true),
});

export async function createCity(formData: FormData) {
  await requireAdmin();
  const data = {
    name: formData.get("name") as string,
    state: formData.get("state") as string,
    image: (formData.get("image") as string) || null,
    active: formData.get("active") === "true",
  };

  const parsed = citySchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  await prisma.city.create({ data: parsed.data });
  revalidatePath("/admin/cities");
  return { success: true };
}

export async function updateCity(id: string, formData: FormData) {
  await requireAdmin();
  const data = {
    name: formData.get("name") as string,
    state: formData.get("state") as string,
    image: (formData.get("image") as string) || null,
    active: formData.get("active") === "true",
  };

  const parsed = citySchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  await prisma.city.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/cities");
  return { success: true };
}

export async function deleteCity(id: string) {
  await requireAdmin();
  await prisma.city.delete({ where: { id } });
  revalidatePath("/admin/cities");
  return { success: true };
}