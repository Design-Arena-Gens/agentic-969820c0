import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Local Services - Customer Support",
  description: "Chat with our customer service team",
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
