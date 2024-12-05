import type { Metadata } from "next";
import { Inter, Noto_Sans } from "next/font/google";
import "./globals.scss";
import LayoutClient from "./layout.client";

const inter = Inter({ subsets: ["latin"] });
const notoSans = Noto_Sans({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Oku.kg | Сиз суйгон китептер ",
  description: `Китеп дүкөнү| книги|books|Бишкек📚с 2019г|\n
    Пополни свою книжную полку новыми книгами`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${notoSans.className}`}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
