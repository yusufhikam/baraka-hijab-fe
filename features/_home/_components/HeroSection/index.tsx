import Image from "next/image";

// interface HeroSectionProps
//   extends Omit<HTMLAttributes<HTMLElement>, "className"> {
//   className?: string;
// }

const HeroSection = () => {
  return (
    <section className="relative mt-10 h-dvh text-white sm:h-[120dvh]">
      <div className="absolute inset-0 h-full w-full">
        <div className="absolute inset-0 z-1 block h-full w-full bg-black/20 sm:hidden" />
        <Image
          data-animate="hero-section-bg"
          src="/images/bg/bg-hero.webp"
          alt="bg-hero"
          fill
          sizes="(max-width: 640px) 100vw, 70vw"
          priority
          className="h-full object-cover"
        />
      </div>

      <div className="m-auto flex flex-col justify-center gap-5">
        <h1
          data-animate="hero-section-title"
          className="font-krona-one z-1 mt-40 text-center text-4xl text-balance text-shadow-lg/30 sm:text-4xl md:text-6xl xl:text-7xl"
        >
          Feel Confident and Beautiful in Every Outfit
        </h1>
        <p
          data-animate="hero-section-subtitle"
          className="font-krub z-1 m-auto mt-5 w-4/5 text-center text-sm text-wrap text-shadow-lg/30 sm:text-xl md:w-2/5 lg:w-2/3 xl:w-1/2 xl:text-2xl"
        >
          Our Muslimah clothing collection is thoughtfully designed to help you
          express your unique style while staying true to your values.
        </p>
      </div>

      <div className="">
        <p className="font-krub absolute bottom-24 z-1 m-3 rounded bg-black/20 p-3 text-center text-pretty backdrop-blur-[2px] text-shadow-lg/30 sm:bottom-20 sm:left-5 sm:m-0 sm:w-1/2 sm:rounded-none sm:bg-transparent sm:p-0 sm:text-left sm:backdrop-blur-none">
          Since 2018, we&apos;ve been bringing you modest fashion that blends
          comfort and style
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
