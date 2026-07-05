import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AuthLayout({
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F7F4]">
      <div className="w-full max-w-md px-4">{children}</div>
    </div>
  );
}