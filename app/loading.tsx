function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded-2xl ${className}`}
    />
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
      <SkeletonBlock className="aspect-[4/3]" />
      <div className="p-4 space-y-3">
        <SkeletonBlock className="h-4 w-3/4" />
        <SkeletonBlock className="h-3 w-1/2" />
        <SkeletonBlock className="h-5 w-1/3" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-brand-violet via-violet-700 to-brand-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <SkeletonBlock className="h-12 w-96 max-w-full mb-4" />
          <SkeletonBlock className="h-5 w-72 max-w-full mb-8" />
          <SkeletonBlock className="h-12 w-80 max-w-full rounded-2xl" />
        </div>
      </div>

      {/* Category pills skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {Array.from({ length: 7 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-9 w-24 rounded-full" />
          ))}
        </div>
      </div>

      {/* Destinations skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <SkeletonBlock className="h-7 w-56 mb-6" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonBlock key={i} className="aspect-[4/5] rounded-3xl" />
          ))}
        </div>
      </div>

      {/* Items grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pb-20">
        <SkeletonBlock className="h-7 w-64 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}