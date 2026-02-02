type DashboardLayoutProps = {
  children: React.ReactNode;
  userAddress: React.ReactNode;
  // userTransaction: React.ReactNode;
};

export default function DashboardLayout({
  children,
  userAddress,
  // userTransaction,
}: DashboardLayoutProps) {
  return (
    <>
      {children}

      <section className="grid grid-cols-4 gap-4">
        {userAddress}

        {/* {userTransaction} */}
      </section>
    </>
  );
}
