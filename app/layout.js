import { Poppins } from 'next/font/google';
import './globals.css';
import MobileBottomNav from '../components/MobileBottomNav';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: 'Auto Ultimate',
  description: 'Vehicle rental dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <MobileBottomNav />
      </body>
    </html>
  );
}
