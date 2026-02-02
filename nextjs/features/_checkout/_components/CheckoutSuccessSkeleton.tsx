import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function CheckoutSuccessSkeleton() {
  return (
    <main className="container-fluid mx-auto flex min-h-dvh items-baseline justify-center bg-zinc-300">
      <Card className="m-auto flex min-h-[400px] max-w-2xl min-w-2xl items-center justify-center rounded-sm">
        <CardContent>
          <Loader2
            className="text-baraka-primary-300 m-auto animate-spin"
            size={80}
            strokeWidth={1}
          />
        </CardContent>
      </Card>
    </main>
  );
}
