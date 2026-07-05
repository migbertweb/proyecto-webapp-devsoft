import type { LucideIcon } from "lucide-react";
import { Search } from "lucide-react";

export function EmptyState({
  icon: Icon = Search,
  title,
  description,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-gray-300" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 text-center">{title}</h3>
      {description && (
        <p className="text-gray-500 mt-2 text-center max-w-md">{description}</p>
      )}
    </div>
  );
}