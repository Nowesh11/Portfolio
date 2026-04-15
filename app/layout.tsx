import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Nowesh's Profile",
  description: "Full-stack developer specializing in web, mobile, desktop, AI, and game development.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%2300e5ff'/><stop offset='100%25' stop-color='%237b5ea7'/></linearGradient></defs><rect width='100' height='100' rx='22' fill='url(%23g)'/><text x='50' y='67' font-size='58' font-weight='900' text-anchor='middle' fill='white' font-family='Arial Black'>N</text></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="page-grid" aria-hidden="true" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
