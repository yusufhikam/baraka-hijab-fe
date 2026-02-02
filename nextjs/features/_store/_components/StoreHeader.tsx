import SearchBarInput from "@/components/common/SearchBarInput";

const COPY_WRITER = {
  title: "Where Modesty Meets Timeless Beauty",
  subtitle:
    "A curated collection of hijabs and essentials, created for women who value elegance, confidence, and intention.",
  cta: "Explore Our Collection",
};

export default function StoreHeader() {
  return (
    <section className="inline-flex w-full items-center rounded-md bg-cover bg-fixed bg-center py-5 sm:mb-10 sm:h-[60dvh] sm:bg-[url('/images/bg/bg-store-header.webp')]">
      <div className="mx-auto inline-flex h-full w-11/12 flex-col items-start justify-center gap-4 text-center text-white sm:mx-0 sm:ms-auto sm:w-2/3 sm:justify-end sm:pr-8 sm:pb-10 sm:text-left md:w-1/2 md:justify-center md:pb-0 xl:w-2/5">
        <h2 className="font-krona-one hidden text-xl font-bold text-shadow-black/30 text-shadow-lg sm:block sm:text-2xl xl:text-3xl">
          {COPY_WRITER.title}
        </h2>
        <div className="font-geist hidden space-y-4 sm:block">
          <h4 className="text-sm font-medium sm:text-base">
            {COPY_WRITER.subtitle}
          </h4>
          <p className="w-full sm:text-right">— {COPY_WRITER.cta}</p>
        </div>

        <SearchBarInput />
      </div>
    </section>
  );
}
