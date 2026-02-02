type StatusPageProps = {
  code: string;
  message: string;
};

export default function StatusPage({ code, message }: StatusPageProps) {
  return (
    <main className="font-krona-one flex h-dvh w-full items-center justify-center text-3xl">
      <div className="inline-flex items-center justify-between p-5">
        <h3 className="w-1/2 text-center text-6xl font-bold">{code}</h3>

        <div className="text-center">
          <h3 className="mb-10 text-red-400">Oops !</h3>
          <h1>{message}</h1>
        </div>
      </div>
    </main>
  );
}
