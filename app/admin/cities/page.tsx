import { prisma } from "@/lib/prisma";
import { CitiesClient } from "./CitiesClient";

export default async function AdminCitiesPage() {
  const cities = await prisma.city.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <CitiesClient cities={cities} />;
}