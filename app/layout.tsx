import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Brew & Co.",
    template: "%s | Brew & Co.",
  },
  description: "Dijital menü, sipariş ve rezervasyon",
};

export const viewport: Viewport = {
  themeColor: "#6b3f2a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className} style={{ backgroundColor: "#fdf6ec", margin: 0 }}>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#6b3f2a",
              color: "#fff",
              borderRadius: "12px",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}