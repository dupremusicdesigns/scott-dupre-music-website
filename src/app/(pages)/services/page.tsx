'use client';

import { css } from '../../../../styled-system/css';
import { grid } from '../../../../styled-system/patterns';
import { ServiceCard } from '../../components/ServiceCard/ServiceCard';
import { PuzzleIcon } from '../../components/icons/PuzzleIcon/PuzzleIcon';
import { FolderIcon } from '../../components/icons/FolderIcon/FolderIcon';
import { WindIcon } from '../../components/icons/WindIcon/WindIcon';
import { HeadphonesIcon } from '../../components/icons/HeadphonesIcon/HeadphonesIcon';
import { TrumpetIcon } from '../../components/icons/TrumpetIcon/TrumpetIcon';
import { PencilIcon } from '../../components/icons/PencilIcon/PencilIcon';

const services = [
    {
        title: 'Custom Arrangements'
        , description: 'A custom music package that is tailored to your program\'s specified strengths.'
        , icon: <PuzzleIcon />
        , href: 'mailto:dupremusicdesigns@gmail.com'
    }
    , {
        title: 'Pre-Existing Commissions'
        , description: 'A previously commissioned marching show that can be customized to your program.'
        , icon: <FolderIcon />
        , href: 'mailto:dupremusicdesigns@gmail.com'
    }
    , {
        title: 'Stagger Breathing Scores'
        , description: 'A custom breathing plan for your band\'s current/upcoming marching show.'
        , icon: <WindIcon />
        , href: 'mailto:dupremusicdesigns@gmail.com'
    }
    , {
        title: 'Buzzing Tracks'
        , description: 'Reference audios of your marching show music with the capability to speed up, slow down, and isolate individual parts.'
        , icon: <HeadphonesIcon />
        , href: 'mailto:dupremusicdesigns@gmail.com'
    }
    , {
        title: 'Clinics'
        , description: 'Click here to schedule a clinic for concert or marching band.'
        , icon: <TrumpetIcon />
        , href: 'mailto:dupremusicdesigns@gmail.com'
    }
    , {
        title: 'Orchestrations/Edits'
        , description: 'A service provided to help orchestrate or edit your current marching music package to better fit your program\'s needs.'
        , icon: <PencilIcon />
        , href: 'mailto:dupremusicdesigns@gmail.com'
    }
];

export default function ServicesPage () {
    return (
        <main
            className={
                css( {
                    position: 'relative'
                    , width: '100%'
                    , backgroundColor: 'background.primary'
                    , paddingBottom: '100px'
                } )
            }
        >
            <div
                className={
                    css( {
                        maxWidth: '1440px'
                        , marginX: 'auto'
                        , position: 'relative'
                    } )
                }
            >
                <section
                    className={
                        css( {
                            paddingLeft: '7%'
                            , paddingRight: '6%'
                            , paddingTop: 'xl'
                        } )
                    }
                >
                    <h1
                        className={
                            css( {
                                fontSize: '6xl'
                                , fontWeight: 'black'
                                , lineHeight: 'tight'
                                , color: 'text.primary'
                                , textTransform: 'uppercase'
                            } )
                        }
                    >
                        Services
                    </h1>
                </section>

                <section
                    className={
                        css( {
                            marginTop: '60px'
                            , marginLeft: '7%'
                            , marginRight: '6%'
                        } )
                    }
                >
                    <div
                        className={
                            grid( {
                                columns: 3
                                , gap: 'lg'
                            } )
                        }
                    >
                        {
                            services.map( ( service, index ) => (
                                <ServiceCard
                                    key={ index }
                                    title={ service.title }
                                    description={ service.description }
                                    icon={ service.icon }
                                    href={ service.href }
                                />
                            ) )
                        }
                    </div>
                </section>
            </div>
        </main>
    );
}
