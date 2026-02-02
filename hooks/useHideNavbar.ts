import { useEffect, useState } from "react";

export default function useHideNavbar() {
  const [navbarHidden, setNavbarHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // if scroll down hide navbar and if scroll up show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavbarHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setNavbarHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, navbarHidden]);

  return { navbarHidden, lastScrollY };
}
