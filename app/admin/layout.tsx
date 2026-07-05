import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { signOutAdmin } from "@/lib/actions/auth";
import { SidebarClient } from "./SidebarClient";
import { LogOut } from "lucide-react";

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
    { href: "/admin", label: "Dashboard", icon: "LayoutDashboard" },
    { href: "/admin/cities", label: "Cidades", icon: "MapPin" },
    { href: "/admin/items", label: "Itens", icon: "Package" },
    { href: "/admin/settings", label: "Configurações", icon: "Settings" },
  ];

  const logoutForm = (
    <form action={signOutAdmin}>
      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors">
        <LogOut className="w-5 h-5" />
        Sair
      </button>
    </form>
  );

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex">
      <SidebarClient navItems={navItems} logoutForm={logoutForm} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
        {children}
      </main>
    </div>
  );
}