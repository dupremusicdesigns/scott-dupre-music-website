import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

const inter = Inter( {
    variable: '--font-inter'
    , subsets: [ 'latin' ]
} );

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
            <body className={ inter.variable }>
                <Header />
                { children }
                <Footer />
            </body>
        </html>
    );
}
