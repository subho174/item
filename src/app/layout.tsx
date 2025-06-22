import { Geist, Geist_Mono, Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Itemo - Add and View Items",
  description:
    "Itemo is a simple inventory portal that allows users to add and browse items with images, categories, and descriptions. Built using Next.js, ShadCN UI, MongoDB.",
  keywords: [
    "Next.js",
    "Item Manager",
    "Inventory App",
    "ShadCN UI",
    "MongoDB",
    "Itemo",
    "Internship Project",
  ],
  authors: [
    { name: "Subhodip Nebu", url: "https://subhodip-portfolio.vercel.app" },
  ],
  creator: "Subhodip Nebu",
  metadataBase: new URL("https://itemo.vercel.app"),
  openGraph: {
    title: "Itemo - Inventory Management App",
    description:
      "Browse and add items with ease using this full-stack app built for internship assignments.",
    url: "https://itemo.vercel.app",
    siteName: "Itemo",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Itemo App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          position="top-right"
          expand={true}
          richColors
          toastOptions={{ className: "sonner-font" }}
        />
        {children}
      </body>
    </html>
  );
}
