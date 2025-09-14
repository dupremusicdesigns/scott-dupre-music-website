import type { Metadata } from 'next';
import './globals.css';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
    title: 'Scott Dupre | Arranger, Composer, Orchestrator'
    , description: ''
};

export default function RootLayout ( {
    children
}: Readonly<{
  children: React.ReactNode;
}> ) {
    return (
        <html lang='en'>
            <body>
                { children }
            </body>
        </html>
    );
}
