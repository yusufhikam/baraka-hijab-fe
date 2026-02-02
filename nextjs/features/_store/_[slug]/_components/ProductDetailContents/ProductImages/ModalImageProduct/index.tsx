import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { PhotoType } from "@/entities/photo/type/photo.type";
// import ProductPhotosCarousel from "@/features/_store/_components/ProductPhotosCarousel";

const ProductPhotosCarousel = dynamic(
  () => import("@/features/_store/_components/ProductPhotosCarousel"),
);

type ModalImageProductProps = {
  photos: PhotoType[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

export default function ModalImageProduct({
  photos,
  isOpen,
  setIsOpen,
}: ModalImageProductProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <DialogTrigger>Open</DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="h-dvh w-full max-w-none overflow-hidden rounded-none border-none bg-transparent data-[state=open]:backdrop-blur-lg sm:max-w-none"
      >
        <VisuallyHidden>
          <DialogTitle />
          <DialogDescription />
        </VisuallyHidden>

        <ProductPhotosCarousel photos={photos} />

        <DialogClose className="font-geist-mono absolute top-11/12 right-1/2 m-auto w-fit translate-x-1/2 cursor-pointer bg-white px-4 py-2 text-red-500 sm:top-10 sm:right-5 sm:translate-x-0">
          [Close]
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
