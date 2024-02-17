import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "Pletunia: Postcards & Bracelets",
  description:
    "Postcards, postcards constructors sets, and friendship bracelets from Yerevan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
