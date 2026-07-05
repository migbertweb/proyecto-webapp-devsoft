import Link from "next/link";
import { RegisterForm } from "./RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-violet to-brand-red flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl font-bold">D</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Criar conta</h1>
        <p className="text-gray-500 mt-2">Cadastre-se como turista</p>
      </div>
      <RegisterForm />
      <p className="text-center text-sm text-gray-500 mt-6">
        Já tem conta?{" "}
        <Link href="/login" className="text-brand-violet font-medium hover:underline">
          Entrar
        </Link>
      </p>
    </>
  );
}