import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

import Footer from "@/app/components/global/footer";
import Header from "@/app/components/global/header";

const ralewayFont = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flight Digital Pokedex App",
  description: "by Codeartist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ralewayFont.variable}`}>
        <Header/>
        {children}
			  <Footer/>
      </body>
    </html>
  );
}
