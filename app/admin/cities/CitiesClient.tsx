"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, MapPin, X, Loader2 } from "lucide-react";
import { createCity, updateCity, deleteCity } from "@/lib/actions/cities";
import { ImageUpload } from "@/components/upload/ImageUpload";
import type { City } from "@prisma/client";

export function CitiesClient({ cities: initialCities }: { cities: City[] }) {
  const router = useRouter();
  const [cities, setCities] = useState(initialCities);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<City | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [image, setImage] = useState("");

  function openCreate() {
    setEditing(null);
    setImage("");
    setErrors({});
    setModalOpen(true);
  }

  function openEdit(city: City) {
    setEditing(city);
    setImage(city.image || "");
    setErrors({});
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    formData.set("image", image);

    const result = editing
      ? await updateCity(editing.id, formData)
      : await createCity(formData);

    if (result.error) {
      setErrors(result.error as Record<string, string[]>);
      setLoading(false);
      return;
    }

    setModalOpen(false);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir esta cidade?")) return;
    await deleteCity(id);
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Cidades</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-violet to-brand-red text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Nova Cidade
        </button>
      </div>

      {cities.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center">
          <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Nenhuma cidade cadastrada.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                  Cidade
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                  Estado
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city) => (
                <tr key={city.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-violet/20 to-brand-red/20 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-brand-violet" />
                      </div>
                      <span className="font-medium text-gray-900">{city.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{city.state}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        city.active
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {city.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(city)}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-brand-violet transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(city.id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editing ? "Editar Cidade" : "Nova Cidade"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nome
                </label>
                <input
                  name="name"
                  defaultValue={editing?.name || ""}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-violet focus:ring-2 focus:ring-violet-100 outline-none transition-all text-sm"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Estado
                </label>
                <input
                  name="state"
                  defaultValue={editing?.state || ""}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-violet focus:ring-2 focus:ring-violet-100 outline-none transition-all text-sm"
                />
                {errors.state && (
                  <p className="text-red-500 text-xs mt-1">{errors.state[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Imagem
                </label>
                <ImageUpload value={image} onChange={setImage} />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="hidden"
                  name="active"
                  value={editing ? String(editing.active) : "true"}
                />
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={editing ? editing.active : true}
                    onChange={(e) => {
                      const hidden = e.currentTarget
                        .closest("form")
                        ?.querySelector<HTMLInputElement>('input[name="active"]');
                      if (hidden) hidden.value = String(e.target.checked);
                    }}
                    className="w-4 h-4 rounded border-gray-300 text-brand-violet focus:ring-brand-violet"
                  />
                  <span className="text-sm text-gray-700">Ativo</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-violet to-brand-red text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {editing ? "Salvar" : "Criar"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}