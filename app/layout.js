
import "./globals.css";


export const metadata = {
  title: "Bhabha AI project",
  description: "create by Faishal Rahman",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
