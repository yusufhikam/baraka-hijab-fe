import ImageWithFallback from "@/components/common/ImageWithFallback";
import GetStarted from "./GetStarted";

export default function SubscribeSection() {
  return (
    <section
      data-animate="subs-section-wrapper"
      className="text-shadow relative z-0 mt-20 min-h-[80dvh] w-full overflow-hidden bg-white text-shadow-zinc-200 sm:mt-0 sm:p-5"
    >
      <ImageWithFallback
        src={"/images/bg-hjb-wu-12.jpg"}
        alt="img"
        fill
        sizes="(min-width: 768px) 100vw, 0vw"
        wraperClassName="subs-section-img-wrapper sm:block hidden ms-5 sm:absolute sm:right-1/2 sm:-top-96 sm:translate-x-1/2 aspect-9/16 w-1/5"
        className="subs-section-img-top object-cover mix-blend-difference"
      />

      <div className="relative space-y-5 px-5 sm:min-h-dvh sm:space-y-0 sm:px-0 lg:min-h-[120svh]">
        <h2
          data-animate="subs-section-title"
          // style={{ opacity: 0 }}
          className="text-[7rem]/[7rem] font-black text-white mix-blend-difference sm:text-9xl"
        >
          NEVER
        </h2>

        <div className="font-krub ms-10 hidden sm:block sm:w-1/2 md:w-1/3">
          {HOW_TO_ORDER_STEPS.map((step, idx) => (
            <div
              data-animate="subs-section-steps"
              key={idx}
              className="group delay-initial relative flex cursor-default items-center gap-20 px-2 text-sm hover:text-white"
            >
              <div className="bg-baraka-lightgreen-200 absolute inset-0 z-0 h-full origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100 group-hover:-skew-x-12" />
              <span className="z-1">0{idx + 1}</span>
              <p className="z-1">{step.title}</p>
            </div>
          ))}
        </div>

        <div className="relative">
          <ImageWithFallback
            src={"/images/bg/bg-sub-section.webp"}
            alt="img"
            fill
            sizes="(min-width: 768px) 33vw, 50vw"
            wraperClassName="subs-section-img-wrapper sm:ms-5 sm:absolute sm:left-1/6 sm:top-10 sm:-translate-x-1/2 aspect-4/5 w-1/3 sm:w-1/4"
            className="subs-section-img object-cover"
          />

          <h2
            data-animate="subs-section-title"
            // style={{ opacity: 0 }}
            className="absolute top-1/2 right-0 z-2 -translate-y-1/2 text-[7rem]/[7rem] font-black text-white mix-blend-difference sm:text-9xl"
          >
            RUN
          </h2>

          <ImageWithFallback
            data-animate="subs-section-bg-img"
            src={"/images/bg-hjb-wu-11.webp"}
            alt="img"
            fill
            sizes="(min-width: 768px) 33vw, 0vw"
            wraperClassName="subs-section-img-wrapper sm:block hidden sm:absolute right-10 translate-y-full top-1/2 aspect-square w-1/5"
            className="object-cover"
          />
        </div>

        <h2
          data-animate="subs-section-title"
          // style={{ opacity: 0 }}
          className="text-center text-[11rem]/[11rem] font-black text-white mix-blend-difference sm:absolute sm:bottom-10 sm:left-1/2 sm:-translate-x-1/2 sm:text-9xl"
        >
          OUT
        </h2>
      </div>

      <GetStarted />

      {/* <div className="content relative z-1">
        <h2 className="z-5">
          With <span className="font-krona-one">Baraka</span>, Embrace
          Individuality and Walk Confidently in Your Own Story.
        </h2>
      </div> */}
    </section>
  );
}

const HOW_TO_ORDER_STEPS = [
  {
    title: "Explore Our Collection",
  },
  {
    title: "Choose Your Size and Style",
  },
  {
    title: "Add some to Bag",
  },
  {
    title: "Place Your Order",
  },
  {
    title: "Get Delivered to Your Door",
  },
];
