import Link from 'next/link';

import { Icons } from '@/components/icons';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="mx-auto w-full px-4">
      <header className="mx-auto flex max-w-[1440px] items-center justify-between py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo />
          <span className="font-bold">Taxonomy</span>
        </Link>
        <div>
          <Link href="/login">Login</Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
