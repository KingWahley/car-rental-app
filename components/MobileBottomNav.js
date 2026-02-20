'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const mobileNavItems = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Filter', href: '/vehicles', icon: 'filter' },
  { label: 'Favourites', href: '/favourites', icon: 'heart' },
  { label: 'Recents', href: '/recents', icon: 'clock' },
  { label: 'Chat', href: '/chat', icon: 'chat' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const visibleRoutes = new Set(['/vehicles', '/favourites', '/recents', '/chat']);
  const isVisible = visibleRoutes.has(pathname);

  if (!isVisible) return null;

  function openFilters() {
    router.push('/vehicles?filters=1');
  }

  return (
    <>
      <nav className="lg:hidden fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2">
        <div className="mx-auto max-w-[760px] rounded-2xl border border-white/60 bg-[#f5f5f7]/90 backdrop-blur-xl shadow-[0_8px_28px_rgba(17,17,17,0.15)]">
          <div className="grid grid-cols-5 gap-1 p-2">
            {mobileNavItems.map((item) => {
              const active = pathname === item.href;

              if (item.icon === 'filter') {
                const filterActive = pathname === '/vehicles';

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={openFilters}
                    className={`flex h-[62px] flex-col items-center justify-center rounded-xl transition ${
                      filterActive ? 'bg-[#232530] text-white' : 'text-[#363948] hover:bg-[#ececf1]'
                    }`}
                  >
                    <span className="h-5 w-5">{renderMobileIcon(item.icon)}</span>
                    <span className="mt-1 text-[11px] leading-none">{item.label}</span>
                  </button>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex h-[62px] flex-col items-center justify-center rounded-xl transition ${
                    active ? 'bg-[#232530] text-white' : 'text-[#363948] hover:bg-[#ececf1]'
                  }`}
                >
                  <span className="h-5 w-5">{renderMobileIcon(item.icon)}</span>
                  <span className="mt-1 text-[11px] leading-none">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
      <div className="lg:hidden h-24" />
    </>
  );
}

function renderMobileIcon(type) {
  const cls = 'h-5 w-5';

  if (type === 'home') {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 11.5L12 4l9 7.5" />
        <path d="M6.5 10.8V20h11V10.8" />
      </svg>
    );
  }

  if (type === 'filter') {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 6h16" />
        <path d="M7 12h10" />
        <path d="M10 18h4" />
      </svg>
    );
  }

  if (type === 'heart') {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20.5s-7-4.2-7-10A4.5 4.5 0 019.5 6c1.2 0 2.3.5 2.5 1 .2-.5 1.3-1 2.5-1A4.5 4.5 0 0119 10.5c0 5.8-7 10-7 10z" />
      </svg>
    );
  }

  if (type === 'clock') {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v5l3 2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 6.5h14a2 2 0 012 2v6a2 2 0 01-2 2H11l-4 3v-3H5a2 2 0 01-2-2v-6a2 2 0 012-2z" />
    </svg>
  );
}
