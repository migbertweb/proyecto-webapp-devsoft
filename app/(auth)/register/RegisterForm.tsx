"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { registerUser } from "@/lib/actions/auth";
import { Loader2 } from "lucide-react";

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const result = await registerUser(formData);

    if (result.error) {
      setErrors(result.error as Record<string, string[]>);
      setLoading(false);
      return;
    }

    const signInResult = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    if (signInResult?.ok) {
      router.push("/");
      router.refresh();
    } else {
      router.push("/login");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Nome
        </label>
        <input
          name="name"
          type="text"
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-violet focus:ring-2 focus:ring-violet-100 outline-none transition-all text-sm"
          placeholder="Seu nome"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-violet focus:ring-2 focus:ring-violet-100 outline-none transition-all text-sm"
          placeholder="seu@email.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Senha
        </label>
        <input
          name="password"
          type="password"
          required
          minLength={6}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-violet focus:ring-2 focus:ring-violet-100 outline-none transition-all text-sm"
          placeholder="Mínimo 6 caracteres"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-violet to-brand-red text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        Criar Conta
      </button>
    </form>
  );
}