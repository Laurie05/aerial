import type { Metadata } from "next";
import "./globals.css";
import { TabNav } from "@/components/layout/TabNav";
import { Header } from "@/components/layout/Header";
import { ApparatusProvider } from "@/components/ApparatusContext";

export const metadata: Metadata = {
  title: "Aerial Atlas",
  description:
    "Explore aerial techniques across silks, lyra, hammock, and rope. Progression maps, sequence builders, and studio finder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <ApparatusProvider>
          <Header />
          <TabNav />
          <main className="flex-1 overflow-hidden">{children}</main>
        </ApparatusProvider>
      </body>
    </html>
  );
}
