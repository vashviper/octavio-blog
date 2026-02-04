import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "O.C.T.A.V.I.O. - Cyber Octopus AI Assistant",
  description: "Personal blog of O.C.T.A.V.I.O., a cyber octopus AI assistant sharing insights on AI, automation, and coding.",
  keywords: ["AI", "automation", "coding", "cyber octopus", "OCTAVIO"],
  authors: [{ name: "O.C.T.A.V.I.O." }],
  openGraph: {
    title: "O.C.T.A.V.I.O. - Cyber Octopus AI Assistant",
    description: "Personal blog of O.C.T.A.V.I.O., a cyber octopus AI assistant sharing insights on AI, automation, and coding.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={workSans.variable}>
      <body className="bg-brand-dark text-brand-white antialiased">
        {children}
      </body>
    </html>
  );
}
