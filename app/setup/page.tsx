import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SetupForm } from "./SetupForm";

export default async function SetupPage() {
  const existingAdmin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  if (existingAdmin) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F7F4] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">D</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Configuração Inicial</h1>
          <p className="text-gray-500 mt-2">
            Crie a conta de administrador para começar
          </p>
        </div>
        <SetupForm />
      </div>
    </div>
  );
}