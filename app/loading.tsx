export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F7F4]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center animate-pulse">
          <span className="text-white text-xl font-bold">D</span>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-brand-violet animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 rounded-full bg-brand-violet animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 rounded-full bg-brand-violet animate-bounce" />
        </div>
      </div>
    </div>
  );
}