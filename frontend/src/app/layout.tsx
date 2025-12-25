
import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: {
    default: 'DH-EMR',
    template: '%s | DH-EMR',
  },
  description: 'Hệ thống hồ sơ bệnh án điện tử',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
