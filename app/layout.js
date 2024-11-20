import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "AI Avatar platform",
  description: "Educate your patient with new AI feature.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` antialiased overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
