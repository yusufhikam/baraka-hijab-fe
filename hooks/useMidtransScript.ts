/* eslint-disable @typescript-eslint/no-explicit-any */
import { MIDTRANS_CLIENT_KEY } from "@/lib/utils";
import { useEffect, useEffectEvent, useState } from "react";

export default function useMidtransScript() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const setEventIsLoaded = useEffectEvent(() => setIsLoaded(true));
  const setEventError = useEffectEvent(() =>
    setError("Failed to load midtrans script."),
  );
  useEffect(() => {
    if ((window as any).snap) {
      setEventIsLoaded();
      return;
    }

    // check if processing make element
    if (document.getElementById("midtrans-script")) return;

    if (!MIDTRANS_CLIENT_KEY) {
      setError("MIDTRANS_CLIENT_KEY is not defined.");
      return;
    }

    const script = document.createElement("script");
    script.id = "midtrans-script";
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js"; // sandbox
    // script.src = 'https://app.midtrans.com/snap/snap.js'; // Production
    script.setAttribute("data-client-key", MIDTRANS_CLIENT_KEY!);
    script.async = true;

    script.onload = () => setIsLoaded(true);

    script.onerror = () => {
      setError("Failed to load midtrans script.");
      setIsLoaded(false);
    };

    document.head.appendChild(script);

    // clean up
    return () => {
      const existingScript = document.getElementById("midtrans-script");
      if (script.parentNode && existingScript) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return { isLoaded, error };
}
