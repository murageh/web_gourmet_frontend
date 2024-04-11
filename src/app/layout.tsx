import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import React from "react";

const font = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Ask Me Anything",
    template: "%s | Web Gourmet",
  },
  description: "Ask me about any website, and I'll do the work for you to find an answer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
