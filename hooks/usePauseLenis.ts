import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";

export default function usePauseLenis() {
  const lenis = useLenis();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!lenis) return;

    const handleModalChange = () => {
      if (!lenis) return;
      // if modal is open stop the lenis
      if (openModal) {
        lenis.stop();
      }
      // if modal is closed start the lenis
      else {
        lenis.start();
      }
    };

    handleModalChange();
  }, [openModal, lenis]);

  return { openModal, setOpenModal };
}
