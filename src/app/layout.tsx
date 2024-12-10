import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.scss";
import LayoutClient from "./layout.client";

const nunito = Nunito({ subsets: ["latin", "cyrillic"] });
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
      <body className={`${nunito.className} `}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
