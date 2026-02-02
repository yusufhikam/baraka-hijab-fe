import AboutSection from "@/features/_home/_components/AboutSection";
import HeroSection from "@/features/_home/_components/HeroSection";
import AboutSectionAnimation from "@/features/_home/animations/AboutSection/AboutSection.animation";
import HeroSectionAnimation from "@/features/_home/animations/HeroSection/HeroSection.animation";
import CategoryCarouselSectionAnimation from "@/features/_home/animations/CategoryCarouselSection/CategoryCarouselSection.animation";
import dynamic from "next/dynamic";
import SubscribeSectionAnimation from "@/features/_home/animations/SubscribeSection/SubscribeSection.animation";

const NewArrivalSection = dynamic(
  () => import("@/features/_home/_components/NewArrivalSections"),
);

const WhyChooseUsSectionAnimated = dynamic(() =>
  import("@/features/_home/animations").then(
    (mod) => mod.WhyChooseUsSectionAnimated,
  ),
);

const ProductCarouselSection = dynamic(
  () => import("@/features/_home/_components/CategoryCarouselSection"),
);

const SubscribeSection = dynamic(
  () => import("@/features/_home/_components/SubscribeSection"),
);

const NewArrivalSectionAnimation = dynamic(
  () =>
    import(
      "@/features/_home/animations/NewArrivalSection/NewArrivalSection.animation"
    ),
);

export default function Home() {
  return (
    <main className="">
      <HeroSectionAnimation>
        <HeroSection />
      </HeroSectionAnimation>

      <AboutSectionAnimation>
        <AboutSection />
      </AboutSectionAnimation>
      {/* <WhyChooseUsSection /> */}
      <WhyChooseUsSectionAnimated />

      <NewArrivalSectionAnimation>
        <NewArrivalSection />
      </NewArrivalSectionAnimation>

      <CategoryCarouselSectionAnimation>
        <ProductCarouselSection />
      </CategoryCarouselSectionAnimation>

      <SubscribeSectionAnimation>
        <SubscribeSection />
      </SubscribeSectionAnimation>
      {/* <NotAllowedPage /> */}
    </main>
  );
}
