import { PhotoType } from "@/entities/photo/type/photo.type";
import { storageBaseURL } from "@/lib/utils";
import Image from "next/image";
import useZoomImage from "../../_[slug]/hooks/useZoomImage";
import useMediaMatcher from "@/hooks/useMediaMatcher";

type ProductImageProps = {
  photo: PhotoType;
};

export default function ProductImage({ photo }: ProductImageProps) {
  const {
    handleWheel,
    doubleClickZoom,
    duringDrag,
    endDrag,
    pos,
    scale,
    dragging,
    startDragging,
  } = useZoomImage();

  const isMobile = useMediaMatcher("(max-width: 640px)");

  if (isMobile) {
    return (
      <Image
        //   ref={imgRef}
        src={`${storageBaseURL}/${photo.photo}`}
        alt={photo.id.toString()}
        width={500}
        height={500}
        unoptimized
        priority
        className="m-auto my-5 aspect-video object-cover object-center"
      />
    );
  }

  return (
    <Image
      //   ref={imgRef}
      src={`${storageBaseURL}/${photo.photo}`}
      alt={photo.id.toString()}
      draggable={false}
      onWheel={handleWheel}
      onDoubleClick={doubleClickZoom}
      onMouseDown={startDragging}
      onMouseMove={duringDrag}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      width={500}
      height={500}
      unoptimized
      priority
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
        transition: dragging.current ? "none" : "transform 0.2s ease",
        cursor:
          scale > 1 ? (dragging.current ? "grabbing" : "grab") : "zoom-in",
      }}
      className="m-auto object-cover object-center sm:aspect-4/5 sm:h-full"
    />
  );
}
