import { prisma } from "@/lib/prisma";
import { MapPin, Package, Users, Heart } from "lucide-react";

export default async function AdminDashboard() {
  const [cityCount, itemCount, userCount, favoriteCount] = await Promise.all([
    prisma.city.count(),
    prisma.travelItem.count(),
    prisma.user.count(),
    prisma.favorite.count(),
  ]);

  const stats = [
    {
      label: "Cidades",
      value: cityCount,
      icon: MapPin,
      gradient: "from-brand-violet to-violet-600",
    },
    {
      label: "Itens",
      value: itemCount,
      icon: Package,
      gradient: "from-brand-red to-red-500",
    },
    {
      label: "Usuários",
      value: userCount,
      icon: Users,
      gradient: "from-violet-500 to-purple-600",
    },
    {
      label: "Favoritos",
      value: favoriteCount,
      icon: Heart,
      gradient: "from-red-400 to-pink-500",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}