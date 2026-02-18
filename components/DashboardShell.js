'use client';

import Header from './Header';
import Sidebar from './Sidebar';

export default function DashboardShell({ children, sidebarProps }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar {...sidebarProps} />
      <div className="flex-1 min-w-0">
        <Header />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
