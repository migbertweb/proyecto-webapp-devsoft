"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  multiple?: boolean;
  gallery?: string[];
  onGalleryChange?: (urls: string[]) => void;
}

export function ImageUpload({
  value,
  onChange,
  multiple = false,
  gallery = [],
  onGalleryChange,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList) {
    setUploading(true);
    setError("");

    const formData = new FormData();
    for (const file of Array.from(files)) {
      formData.append("files", file);
    }

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      if (multiple && onGalleryChange) {
        onGalleryChange([...gallery, ...data.urls]);
      } else if (data.urls[0] && onChange) {
        onChange(data.urls[0]);
      }
    } catch {
      setError("Erro no upload");
    } finally {
      setUploading(false);
    }
  }

  function removeGalleryImage(index: number) {
    if (onGalleryChange) {
      onGalleryChange(gallery.filter((_, i) => i !== index));
    }
  }

  return (
    <div className="space-y-3">
      {value && !multiple && onChange && (
        <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {multiple && gallery.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {gallery.map((url, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
              <Image src={url} alt={`Gallery ${i}`} fill className="object-cover" />
              <button
                type="button"
                onClick={() => removeGalleryImage(i)}
                className="absolute top-1 right-1 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple={multiple}
        className="hidden"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 hover:border-brand-violet hover:bg-violet-50 transition-all text-sm text-gray-500 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {uploading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Upload className="w-4 h-4" />
        )}
        {uploading ? "Enviando..." : multiple ? "Adicionar imagens" : "Upload de imagem"}
      </button>

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}