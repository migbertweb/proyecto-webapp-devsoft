"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateSettings } from "@/lib/actions/settings";
import { Loader2, MessageCircle } from "lucide-react";

export function SettingsClient({
  defaultWhatsapp: initialWhatsapp,
}: {
  defaultWhatsapp: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    await updateSettings(formData);

    setSuccess(true);
    setLoading(false);
    router.refresh();

    setTimeout(() => setSuccess(false), 3000);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Configurações</h1>

      <div className="bg-white rounded-3xl shadow-sm p-8 max-w-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">WhatsApp Padrão</h2>
            <p className="text-sm text-gray-500">
              Número usado quando o item não tem WhatsApp próprio
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Número (apenas dígitos)
            </label>
            <input
              name="defaultWhatsapp"
              defaultValue={initialWhatsapp}
              placeholder="5545999999999"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-violet focus:ring-2 focus:ring-violet-100 outline-none transition-all text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">
              Formato: código do país + DDD + número. Ex: 5545999999999
            </p>
          </div>

          {success && (
            <div className="bg-green-50 text-green-600 text-sm p-3 rounded-xl">
              Configurações salvas com sucesso!
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-violet to-brand-red text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}