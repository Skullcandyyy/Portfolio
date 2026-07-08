import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import ThemeProvider from "@/components/ThemeProvider";
import { RecruiterModeProvider } from "@/components/RecruiterMode";
import ScrollProgress from "@/components/ScrollProgress";
import CursorTrail from "@/components/CursorTrail";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rohit Kumar | AI & Full Stack Developer",
  description:
    "AI and Full Stack Developer specializing in LangChain, RAG architectures, and the MERN stack. Building intelligent applications with LLMs and vector databases.",
  keywords: [
    "Rohit Kumar",
    "AI Developer",
    "Full Stack Developer",
    "Python",
    "LangChain",
    "React",
    "Node.js",
    "RAG",
    "LLM",
    "Vector Database",
    "Portfolio",
  ],
  authors: [{ name: "Rohit Kumar" }],
  creator: "Rohit Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rohitkumar.dev",
    siteName: "Rohit Kumar — Portfolio",
    title: "Rohit Kumar | AI & Full Stack Developer",
    description:
      "AI and Full Stack Developer specializing in LangChain, RAG architectures, and the MERN stack. Building intelligent applications with LLMs and vector databases.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rohit Kumar — AI & Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit Kumar | AI & Full Stack Developer",
    description:
      "AI and Full Stack Developer specializing in LangChain, RAG architectures, and the MERN stack.",
    images: ["/og-image.png"],
    creator: "@rohitkumar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var theme = localStorage.getItem('theme');
                if (theme === 'light' || theme === 'dark') {
                  document.documentElement.classList.add(theme);
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            })();
          `}
        </Script>
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          <RecruiterModeProvider>
            <ScrollProgress />
            <CursorTrail />
            {children}
          </RecruiterModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
