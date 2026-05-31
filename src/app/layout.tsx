import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anh Duong Property - Sàn Bất Động Sản Cao Cấp",
  description: "Chuyên phân phối, ký gửi biệt thự, liền kề, căn hộ hạng sang tại Vinhomes Ocean Park, Vinhomes Hạ Long Xanh và các dự án cao cấp khác.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-brand-verydark font-sans">
        <Header />
        <main className="flex-grow pt-20 bg-white">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

