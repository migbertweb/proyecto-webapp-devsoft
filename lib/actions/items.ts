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

const itemSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  category: z.string(),
  cityId: z.string(),
  image: z.string().optional().nullable(),
  gallery: z.string().default("[]"),
  price: z.coerce.number().min(0),
  whatsapp: z.string().optional().nullable(),
  active: z.boolean().default(true),
});

export async function createItem(formData: FormData) {
  await requireAdmin();
  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    cityId: formData.get("cityId") as string,
    image: (formData.get("image") as string) || null,
    gallery: (formData.get("gallery") as string) || "[]",
    price: formData.get("price") as string,
    whatsapp: (formData.get("whatsapp") as string) || null,
    active: formData.get("active") === "true",
  };

  const parsed = itemSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  await prisma.travelItem.create({ data: parsed.data });
  revalidatePath("/admin/items");
  return { success: true };
}

export async function updateItem(id: string, formData: FormData) {
  await requireAdmin();
  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    cityId: formData.get("cityId") as string,
    image: (formData.get("image") as string) || null,
    gallery: (formData.get("gallery") as string) || "[]",
    price: formData.get("price") as string,
    whatsapp: (formData.get("whatsapp") as string) || null,
    active: formData.get("active") === "true",
  };

  const parsed = itemSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

  await prisma.travelItem.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/items");
  return { success: true };
}

export async function deleteItem(id: string) {
  await requireAdmin();
  await prisma.travelItem.delete({ where: { id } });
  revalidatePath("/admin/items");
  return { success: true };
}