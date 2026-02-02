import Image from "next/image";

import starIconSvg from "../../../../public/svg/star.svg";

const AboutSection = () => {
  return (
    <section className="flex w-full items-center justify-center px-10 py-20 sm:min-h-[80dvh]">
      <h2
        data-animate="about-section-title"
        className="font-geist text-center text-4xl font-black md:text-4xl xl:text-5xl/snug 2xl:text-6xl"
      >
        AT BARAKA{" "}
        <span className="hidden items-center sm:inline-flex">
          <Image alt="star_icon" src={starIconSvg} className="size-10" />
        </span>{" "}
        WE BELIEVE THAT MODEST FASHION{" "}
        <span className="hidden items-center sm:inline-flex">
          <Image
            alt="background"
            src={"/images/bg/bg-about.webp"}
            width={100}
            height={50}
            className="size-9 w-20 rounded-full object-cover"
          />
        </span>{" "}
        <span className="text-gray-300">
          IS SHOULD BE EFFORTLESS, EMPOWERING, AND TRUE TO YOUR—IDENTITY
        </span>
      </h2>
    </section>
  );
};

export default AboutSection;
