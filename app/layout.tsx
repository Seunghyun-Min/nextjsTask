//後で余裕あればMetadata作成 export const metadata: Metadata = {...}
// app/layout.tsx
import "./layout.css";

export const metadata = {
  title: "My App",
  description: "社員管理アプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
