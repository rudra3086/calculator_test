import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calculator App",
  description: "A calculator app with user authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
