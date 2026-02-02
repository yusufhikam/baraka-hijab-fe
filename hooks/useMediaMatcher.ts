import { useEffect, useState } from "react";

export default function useMediaMatcher(mediaQuery: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(mediaQuery);
    const updateMatch = () => setMatches(media.matches);
    updateMatch();
    // const handleChange = (e: MediaQueryListEvent) => {
    //   setMatches(e.matches);
    // };
    // setMatches(media.matches);

    media.addEventListener("change", updateMatch);
    return () => media.removeEventListener("change", updateMatch);
  }, [mediaQuery]);

  return matches;
}
