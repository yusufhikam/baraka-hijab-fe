"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";

type GreetingsProps = {
  message?: string;
};

const Greetings = ({ message = "Hello" }: GreetingsProps) => {
  const { user } = useAuth();
  // console.log("🚀 ~ Greetings ~ user:", user);
  return (
    <h4>
      {message} {user?.name}
    </h4>
  );
};

export default Greetings;
