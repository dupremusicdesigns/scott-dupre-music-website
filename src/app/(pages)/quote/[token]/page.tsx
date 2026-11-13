import type { Metadata } from 'next';
import { QuoteExperience } from '../../../components/quote/QuoteExperience/QuoteExperience';
import { getHome } from '../../../api/home';
import { QUOTE_PLACEHOLDER_TOKEN } from '../../../constants/quoteConstants';

export const dynamicParams = false;

export const metadata: Metadata = {
    title: 'Your Quote'
    , robots: {
        index: false
        , follow: false
    }
    , referrer: 'no-referrer'
};

export const generateStaticParams = () => [ { token: QUOTE_PLACEHOLDER_TOKEN } ];

export default async function QuotePage () {
    const { data: home } = await getHome();

    return <QuoteExperience heroImageUrl={ home?.heroImage?.url ?? null } />;
}
