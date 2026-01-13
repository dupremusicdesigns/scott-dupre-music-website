import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from './components/layout/Header/Header';
import { Footer } from './components/layout/Footer/Footer';
import { LogRocketProvider } from './components/LogRocketProvider/LogRocketProvider';

const inter = Inter( {
    variable: '--font-inter'
    , subsets: [ 'latin' ]
} );

const siteUrl = 'https://www.dupremusicdesigns.com';

export const metadata: Metadata = {
    metadataBase: new URL( siteUrl )
    , title: {
        default: 'Scott Dupre | Arranger & Composer'
        , template: '%s | Dupre Music Designs'
    }
    , description: 'Dupre Music Designs provides quality music arrangements, original compositions and music book edits that are custom tailored to your organization.'
    , openGraph: {
        type: 'website'
        , siteName: 'Dupre Music Designs'
    }
};

export default function RootLayout ( {
    children
}: Readonly<{
  children: React.ReactNode;
}> ) {
    return (
        <html lang='en'>
            <body className={ inter.variable }>
                <LogRocketProvider />
                <Header />
                { children }
                <Footer />
            </body>
        </html>
    );
}
