import { Loader2 } from "lucide-react";
import React from "react";

const LoaderPage = () => {
  return (
    <main className="flex h-dvh w-dvw items-center justify-center bg-white">
      <Loader2
        size={80}
        strokeWidth={1}
        className="text-baraka-primary-300 animate-spin"
      />
    </main>
  );
};

export default LoaderPage;
