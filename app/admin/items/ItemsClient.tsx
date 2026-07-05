"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Package, X, Loader2 } from "lucide-react";
import { createItem, updateItem, deleteItem } from "@/lib/actions/items";
import { ImageUpload } from "@/components/upload/ImageUpload";
import { Toast } from "@/components/ui/Toast";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { CATEGORIES, CATEGORY_LABELS, type Category } from "@/lib/categories";
import { formatPrice } from "@/lib/utils";
import type { City, TravelItem } from "@prisma/client";

type ItemWithCity = TravelItem & { city: City };

export function ItemsClient({
  items: initialItems,
  cities,
}: {
  items: ItemWithCity[];
  cities: City[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ItemWithCity | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [image, setImage] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function openCreate() {
    setEditing(null);
    setImage("");
    setGallery([]);
    setErrors({});
    setModalOpen(true);
  }

  function openEdit(item: ItemWithCity) {
    setEditing(item);
    setImage(item.image || "");
    try {
      setGallery(JSON.parse(item.gallery));
    } catch {
      setGallery([]);
    }
    setErrors({});
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setErrors({});
  }

  useEffect(() => {
    if (!modalOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [modalOpen]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    formData.set("image", image);
    formData.set("gallery", JSON.stringify(gallery));

    const result = editing
      ? await updateItem(editing.id, formData)
      : await createItem(formData);

    if (result.error) {
      setErrors(result.error as Record<string, string[]>);
      setLoading(false);
      return;
    }

    closeModal();
    const action = editing ? "actualizado" : "criado";
    setToast({ message: `Item ${action} com sucesso!`, type: "success" });
    router.refresh();
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Excluir "${title}"? Esta ação não pode ser desfeita.`))
      return;
    await deleteItem(id);
    setToast({ message: "Item excluído com sucesso!", type: "success" });
    router.refresh();
  }

  const closeToast = useCallback(() => setToast(null), []);
  const modalRef = useFocusTrap(modalOpen);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Itens Turísticos</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-gradient text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Novo Item
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Nenhum item cadastrado.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                  Item
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                  Categoria
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                  Cidade
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                  Preço
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
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50"
                >
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">
                      {item.title}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {CATEGORY_LABELS[item.category as Category] ||
                      item.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.city.name}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {formatPrice(item.price)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.active
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(item)}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-brand-violet transition-colors"
                        aria-label="Editar"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Excluir"
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
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={editing ? "Editar Item" : "Novo Item"}
          ref={modalRef}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative my-8">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editing ? "Editar Item" : "Novo Item"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="item-title">
                  Título
                </label>
                <input
                  id="item-title"
                  name="title"
                  defaultValue={editing?.title || ""}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-violet focus:ring-2 focus:ring-violet-100 outline-none transition-all text-sm"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="item-description">
                  Descrição
                </label>
                <textarea
                  id="item-description"
                  name="description"
                  defaultValue={editing?.description || ""}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-violet focus:ring-2 focus:ring-violet-100 outline-none transition-all text-sm resize-none"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description[0]}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Categoria
                  </label>
                  <select
                    name="category"
                    defaultValue={editing?.category || ""}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-violet focus:ring-2 focus:ring-violet-100 outline-none transition-all text-sm"
                  >
                    <option value="">Selecionar...</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {CATEGORY_LABELS[cat as Category]}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.category[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Cidade
                  </label>
                  <select
                    name="cityId"
                    defaultValue={editing?.cityId || ""}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-violet focus:ring-2 focus:ring-violet-100 outline-none transition-all text-sm"
                  >
                    <option value="">Selecionar...</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name} - {city.state}
                      </option>
                    ))}
                  </select>
                  {errors.cityId && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.cityId[0]}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Preço (R$)
                  </label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    defaultValue={editing?.price || 0}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-violet focus:ring-2 focus:ring-violet-100 outline-none transition-all text-sm"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.price[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    WhatsApp (opcional)
                  </label>
                  <input
                    name="whatsapp"
                    defaultValue={editing?.whatsapp || ""}
                    placeholder="5545999999999"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-violet focus:ring-2 focus:ring-violet-100 outline-none transition-all text-sm"
                  />
                  {errors.whatsapp && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.whatsapp[0]}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Imagem Principal
                </label>
                <ImageUpload value={image} onChange={setImage} />
                {errors.image && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.image[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Galeria
                </label>
                <ImageUpload
                  multiple
                  gallery={gallery}
                  onGalleryChange={setGallery}
                />
                {errors.gallery && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.gallery[0]}
                  </p>
                )}
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
                        ?.querySelector<HTMLInputElement>(
                          'input[name="active"]'
                        );
                      if (hidden) hidden.value = String(e.target.checked);
                    }}
                    className="w-4 h-4 rounded border-gray-300 text-brand-violet focus:ring-brand-violet"
                  />
                  <span className="text-sm text-gray-700">Ativo</span>
                </label>
              </div>

              {errors._form && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">
                  {errors._form[0]}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl btn-gradient flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {editing ? "Salvar" : "Criar"}
              </button>
            </form>
          </div>
        </div>
      )}

      <Toast
        message={toast?.message || ""}
        type={toast?.type || "success"}
        show={!!toast}
        onClose={closeToast}
      />
    </div>
  );
}