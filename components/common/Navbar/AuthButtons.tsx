import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const buttonLinks = [
  {
    title: "Sign Up",
    href: "/auth/register",
  },
  {
    title: "Sign In",
    href: "/auth/login",
  },
];

type AuthButtonsProps = {
  className?: string;
};

const AuthButtons: React.FC<AuthButtonsProps> = ({ className }) => {
  return buttonLinks.map((item, idx) => (
    <Button
      key={idx}
      asChild
      size={"sm"}
      variant={"ghost"}
      className={cn(
        "hover:bg-baraka-primary-300 hover:text-baraka-primary-100 w-20 rounded-sm",
        className,
        idx === 0
          ? "border border-black hover:border-0"
          : "bg-black text-white",
      )}
    >
      <Link href={item.href}>{item.title}</Link>
    </Button>
  ));
};

export default AuthButtons;
