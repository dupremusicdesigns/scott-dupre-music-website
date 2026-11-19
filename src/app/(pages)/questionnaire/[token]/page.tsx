import type { Metadata } from 'next';
import { QuestionnaireExperience } from '../../../components/questionnaire/QuestionnaireExperience';
import { getHome } from '../../../api/home';
import { QUESTIONNAIRE_PLACEHOLDER_TOKEN } from '../../../constants/questionnaireConstants';

export const dynamicParams = false;

export const metadata: Metadata = {
    title: 'Instrumentation'
    , robots: {
        index: false
        , follow: false
    }
    , referrer: 'no-referrer'
};

export const generateStaticParams = () => [ { token: QUESTIONNAIRE_PLACEHOLDER_TOKEN } ];

export default async function QuestionnairePage () {
    const { data: home } = await getHome();

    return <QuestionnaireExperience heroImageUrl={ home?.heroImage?.url ?? null } />;
}
