export default function NotFound() {
  return (
    <main className="flex h-dvh w-full items-center justify-center text-black">
      <div className="font-geist inline-flex h-1/4 w-1/2 items-center justify-between text-center font-semibold">
        <h2 className="text-4xl sm:text-8xl">404</h2>
        <hr className="h-full ring" />
        <h1 className="text-3xl sm:text-5xl">
          We&apos;re Sorry.
          <br />
          Product Not Found
        </h1>
      </div>
    </main>
  );
}
