import "~/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Basic Strategy",
  description: "Practice your blackjack basic strategy",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
