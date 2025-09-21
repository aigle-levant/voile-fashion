import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import localFont from "next/font/local";

// styles for switzer
const switzer = localFont({
  display: "swap",
  src: [
    {
      path: "../public/fonts/Switzer-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Switzer-Thin.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Switzer-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Switzer-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Switzer-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Switzer-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Switzer-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Switzer-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Switzer-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Switzer-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Switzer-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Switzer-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Switzer-Light.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Switzer-Light.woff",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Switzer-Light.ttf",
      weight: "300",
      style: "italic",
    },
  ],
  variable: "--font-switzer",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Voile 2.0",
  description: "Fashion Gallery built with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={switzer.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
