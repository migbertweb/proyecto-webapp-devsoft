import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOutAdmin } from "@/lib/actions/auth";
import {
  LayoutDashboard,
  MapPin,
  Package,
  Settings,
  LogOut,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/cities", label: "Cidades", icon: MapPin },
    { href: "/admin/items", label: "Itens", icon: Package },
    { href: "/admin/settings", label: "Configurações", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex">
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <form action={signOutAdmin}>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors">
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}