import "../styles/globals.css";

declare global {
  interface Window {
    cardPositions: any[];
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-custom">{children}</body>
    </html>
  );
}
