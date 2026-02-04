import MyBreadcrumb from "@/components/common/MyBreadcrumb/MyBreadcrumb";
import AppSidebar from "@/components/common/protected-routes/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import ProtectedRoutes from "@/stores/ProtectedRoutes";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      {/* {children} */}
      <ProtectedRoutes allowedUsers="customer">
        <main className="relative bg-zinc-200 py-16">
          <SidebarProvider>
            <AppSidebar />
            <section className="h-full w-full p-5">
              <MyBreadcrumb />
              {children}
            </section>
          </SidebarProvider>
        </main>
      </ProtectedRoutes>
    </>
  );
}
