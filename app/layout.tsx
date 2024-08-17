import "../styles/globals.css";

declare global {
  interface Window {
    xyValue: { x: number; y: number };
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
