import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Team Access control",
  description:
    "Role-based access control system built with Next.js 16 & React 19",
  keywords: ['team', 'access control']
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="min-h-screen bg-stale-950 text-slate"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
