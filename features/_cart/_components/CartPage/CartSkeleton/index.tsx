export default function CartSkeleton() {
  return (
    <section className="flex w-full items-start justify-between gap-10">
      {/* LEFT SECTION */}
      <div className="w-3/4 space-y-5">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="h-36 w-full animate-pulse rounded-md bg-zinc-300"
          />
        ))}
      </div>

      {/* RIGHT SECTION */}
      <div className="w h-56 w-1/4 animate-pulse rounded-md bg-zinc-300" />
    </section>
  );
}
