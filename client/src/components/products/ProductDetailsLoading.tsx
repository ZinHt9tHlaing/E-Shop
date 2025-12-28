const ProductDetailsLoading = () => {
  return (
    <section className="container grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 animate-pulse">
      {/* Left image section */}
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="size-24 bg-gray-200 rounded-md"
            />
          ))}
        </div>

        <div className="col-span-3 bg-gray-200 rounded-md aspect-square" />
      </div>

      {/* Right details section */}
      <div className="flex flex-col gap-4">
        <div className="h-8 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-32" />
        <div className="h-8 bg-gray-200 rounded w-24" />

        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>

        <div className="h-6 bg-gray-200 rounded w-32 mt-4" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="size-6 bg-gray-200 rounded-full" />
          ))}
        </div>

        <div className="h-6 bg-gray-200 rounded w-32 mt-4" />
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="px-6 py-3 bg-gray-200 rounded-full"
            />
          ))}
        </div>

        <div className="h-10 bg-gray-200 rounded-full mt-6" />
      </div>
    </section>
  );
};

export default ProductDetailsLoading;
