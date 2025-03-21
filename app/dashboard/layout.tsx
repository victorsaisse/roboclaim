import "@/app/globals.css";
import ProtectedRoute from "@/components/protected-route";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <SidebarProvider>{children}</SidebarProvider>
    </ProtectedRoute>
  );
}
