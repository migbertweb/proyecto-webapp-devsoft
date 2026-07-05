import { prisma } from "@/lib/prisma";
import { SettingsClient } from "./SettingsClient";

export default async function AdminSettingsPage() {
  const settings = await prisma.settings.findFirst();

  return <SettingsClient defaultWhatsapp={settings?.defaultWhatsapp || ""} />;
}