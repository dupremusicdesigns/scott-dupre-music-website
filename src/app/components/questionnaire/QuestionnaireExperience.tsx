'use client';

import { css } from '../../../../styled-system/css';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';
import { QuoteBanner } from '../quote/QuoteBanner/QuoteBanner';
import { QuoteMessage } from '../quote/QuoteMessage/QuoteMessage';
import { QuestionnaireForm } from './QuestionnaireForm';

type QuestionnaireExperienceProps = {
    heroImageUrl: string | null;
}

export const QuestionnaireExperience = ( { heroImageUrl }: QuestionnaireExperienceProps ) => {
    const {
        phase
        , failure
        , saved
        , busy
        , submit
    } = useQuestionnaire();

    return (
        <main
            className={
                css( {
                    width: '100%'
                    , minHeight: '60vh'
                    , backgroundColor: 'background.primary'
                } )
            }
        >
            {
                phase.name !== 'ready' && (
                    <QuoteBanner
                        imageUrl={ heroImageUrl }
                        compact
                    />
                )
            }
            {
                phase.name === 'loading' && (
                    <QuoteMessage title='One moment'>
                        Loading your questionnaire.
                    </QuoteMessage>
                )
            }
            {
                phase.name === 'missing' && (
                    <QuoteMessage title='Link not found'>
                        This link is not valid anymore. Please contact me for a new one.
                    </QuoteMessage>
                )
            }
            {
                phase.name === 'failed' && (
                    <QuoteMessage title='Something went wrong'>
                        We could not load your questionnaire. Please check your connection and refresh the page.
                    </QuoteMessage>
                )
            }
            {
                phase.name === 'ready' && (
                    <>
                        <QuoteBanner imageUrl={ heroImageUrl }>
                            <p
                                className={
                                    css( {
                                        fontSize: 'base'
                                        , fontWeight: 'extrabold'
                                        , textTransform: 'uppercase'
                                        , letterSpacing: 'tight'
                                        , color: 'text.inverse'
                                    } )
                                }
                            >
                                Instrumentation
                            </p>
                            <h1
                                className={
                                    css( {
                                        marginTop: 'xs'
                                        , fontSize: '3xl'
                                        , fontWeight: 'black'
                                        , lineHeight: 'tight'
                                        , textTransform: 'uppercase'
                                        , color: 'text.inverse'
                                        , textWrap: 'balance'
                                        , sm: { fontSize: '4xl' }
                                        , md: { fontSize: '5xl' }
                                    } )
                                }
                            >
                                { phase.questionnaire.school }
                                { ' ' }
                                { phase.questionnaire.season }
                            </h1>
                            <p
                                className={
                                    css( {
                                        maxWidth: '56ch'
                                        , marginTop: 'sm'
                                        , fontSize: 'md'
                                        , fontWeight: 'medium'
                                        , color: 'text.inverse'
                                        , sm: { fontSize: 'lg' }
                                    } )
                                }
                            >
                                Tell me who you expect to march. Fill in what you know now, and come back to this page any time to update it.
                            </p>
                        </QuoteBanner>
                        <QuestionnaireForm
                            questionnaire={ phase.questionnaire }
                            busy={ busy }
                            failure={ failure }
                            saved={ saved }
                            onSubmit={ submit }
                        />
                    </>
                )
            }
        </main>
    );
};
