import { Button } from "@/components/ui/button";
import { Facebook, Instagram, PhoneIcon } from "lucide-react";

const AboutBaraka = () => {
  return (
    <section
      data-animate="about-section-wrapper"
      className="font-geist mt-10 hidden w-full flex-col items-center justify-between border-y border-black sm:mt-0 sm:mb-20 sm:flex sm:flex-row"
    >
      <div className="h-full p-5 sm:flex-3">
        <p
          // style={{ opacity: 0 }}
          data-animate="about-section-moto"
          className="text-justify text-base sm:text-left"
        >
          <b>BARAKA</b> blends tradition, modesty, and modern style in
          high-quality Muslim clothing. Our collection, from hijab to thobes,
          empowers individuals with elegant fashion for everyday wear and
          special occasions
        </p>
      </div>

      <div className="h-full w-full space-y-10 border-t border-black p-5 text-xl sm:flex-1 sm:border-t-0 sm:border-l">
        <div className="">
          <p
            data-animate="about-section-count"
            className="text-5xl font-bold sm:text-3xl"
          >
            10,000+
          </p>
          <p data-animate="about-section-count">Happy Customers</p>
        </div>

        <div className="space-y-2 overflow-hidden">
          <p data-animate="about-section-count">More Info :</p>
          <div className="space-x-2">
            {socialLinks.map((item, idx) => (
              <Button
                data-animate="about-section-socials"
                key={idx}
                asChild
                variant={"outline"}
                className="hover:bg-baraka-lightgreen-200 text-black hover:text-white"
              >
                <a target="_blank" href={item.link}>
                  <item.icon />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const socialLinks = [
  {
    name: "Instagram",
    link: "https://www.instagram.com/baraka.hijab",
    icon: Instagram,
  },
  {
    name: "Facebook",
    link: "https://www.facebook.com/baraka.hijab",
    icon: Facebook,
  },
  { name: "Whatsapp", link: "https://wa.me/6289513108192", icon: PhoneIcon },
];

export default AboutBaraka;
