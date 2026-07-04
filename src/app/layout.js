import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

const poppins = localFont({
  src: [
    { path: "./fonts/Poppins-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Poppins-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "ShopLite",
  description: "A small e-commerce demo built with Next.js App Router.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans bg-transparent text-zinc-950 dark:text-zinc-50">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
      </body>
    </html>
  );
}
