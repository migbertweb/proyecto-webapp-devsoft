import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { CityProvider } from "@/components/city/CityProvider";
import { CitySelectorModal } from "@/components/city/CitySelectorModal";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminExists = await prisma.user.findFirst({
    where: { role: "ADMIN" },
    select: { id: true },
  });

  if (!adminExists) {
    redirect("/setup");
  }

  const cities = await prisma.city.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });

  const cookieStore = await cookies();
  const cityId = cookieStore.get("current-city-id")?.value || null;

  return (
    <CityProvider cities={cities} initialCityId={cityId}>
      <Navbar cities={cities} currentCityId={cityId} />
      <main className="min-h-screen">{children}</main>
      <CitySelectorModal cities={cities} />
    </CityProvider>
  );
}