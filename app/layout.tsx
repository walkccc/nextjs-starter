import './globals.css';

import { Toaster } from '@/components/ui/toaster';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <body className="min-h-screen">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
