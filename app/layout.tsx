import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/providers/react-query-provider";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RoboClaim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.className} antialiased`}>
        <NuqsAdapter>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </NuqsAdapter>
        <Toaster />
      </body>
    </html>
  );
}
