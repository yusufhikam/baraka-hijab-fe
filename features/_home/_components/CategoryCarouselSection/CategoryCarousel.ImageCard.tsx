import ImageWithFallback from "@/components/common/ImageWithFallback";
import { Button } from "@/components/ui/button";
import { storageBaseURL } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type CategoryCarouselImageCardProps = {
  currentPhotoProduct: string;
  currentSubCategoryLink: string;
};
const CategoryCarouselImageCard: React.FC<CategoryCarouselImageCardProps> = ({
  currentPhotoProduct,
  currentSubCategoryLink,
}) => {
  return (
    <div className="group absolute top-1/2 left-1/2 z-5 aspect-4/5 h-auto w-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden transition-transform duration-300 ease-in-out hover:scale-125 sm:w-1/3 sm:hover:scale-100 lg:top-1/3 lg:w-1/3 lg:-translate-y-1/3">
      <ImageWithFallback
        // key={currentPhotoProduct}
        data-animate="product-carousel-content-item-img"
        src={`${storageBaseURL}/${currentPhotoProduct}`}
        alt="product"
        width={800}
        height={800}
        variant="pulse"
        style={{ willChange: "opacity, transform" }}
        wraperClassName="w-full h-full product-carousel-content-item-img-wrapper"
        className="h-full w-full rounded-xs object-cover shadow-lg shadow-black/30"
      />

      <div
        // data-animate="product-carousel-content-item-img"
        className="pointer-events-none absolute inset-0 z-2 flex items-center justify-center uppercase opacity-0 transition-all duration-300 ease-in-out group-hover:pointer-events-auto group-hover:opacity-100"
      >
        {" "}
        <Button variant={"secondary"} asChild className="rounded-xs">
          <Link href={currentSubCategoryLink}>
            SHOW MORE <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CategoryCarouselImageCard;
