import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "My Tutor — AI-репетитор для программистов",
  description: "Персональный AI-репетитор по C, C++, Python и английскому языку на русском",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
