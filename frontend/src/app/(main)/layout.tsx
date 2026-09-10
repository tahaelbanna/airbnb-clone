import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RequireNormalUser } from "@/components/auth/require-normal-user";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireNormalUser>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </div>
    </RequireNormalUser>
  );
}
