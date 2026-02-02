import dynamic from "next/dynamic";

const CardLoginForm = dynamic(
  () => import("@/features/auth/login/_components/CardLoginForm"),
);

const LoginPage = () => {
  return (
    <main className="flex h-dvh items-center justify-center bg-[url(/images/bg/bg-login.jpg)] bg-cover bg-center lg:justify-between lg:bg-none">
      <div className="hidden h-dvh w-1/2 bg-[url(/images/bg/bg-login.jpg)] bg-cover bg-center lg:block" />
      <CardLoginForm />
    </main>
  );
};

export default LoginPage;
