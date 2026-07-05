import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <>
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl font-bold">D</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Bem-vindo de volta</h1>
        <p className="text-gray-500 mt-2">Entre na sua conta</p>
      </div>
      <Suspense>
        <LoginForm />
      </Suspense>
      <p className="text-center text-sm text-gray-500 mt-6">
        Não tem conta?{" "}
        <Link href="/register" className="text-brand-violet font-medium hover:underline">
          Cadastre-se
        </Link>
      </p>
    </>
  );
}