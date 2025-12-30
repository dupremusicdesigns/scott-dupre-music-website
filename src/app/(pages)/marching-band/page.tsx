import { css } from '../../../../styled-system/css';
import { LinkButton } from '../../components/LinkButton/LinkButton';
import { getMarchingShows } from '../../api/marchingShows';
import { ShowsGrid } from '../../components/marching-shows/ShowsGrid';
import { sortMarchingShows } from '../../utils/generalUtils';

export default async function MarchingBandPage () {
    const { data: shows } = await getMarchingShows();
    const sortedShows = sortMarchingShows( shows );

    return (
        <main
            className={
                css( {
                    width: '100%'
                    , maxWidth: '1440px'
                    , marginX: 'auto'
                    , paddingX: '7%'
                    , paddingTop: 'xl'
                    , paddingBottom: '2xl'
                    , md: {
                        paddingTop: '2xl'
                        , paddingBottom: '120px'
                    }
                } )
            }
        >
            <div
                className={
                    css( {
                        display: 'flex'
                        , flexDirection: 'column'
                        , gap: 'lg'
                        , marginBottom: 'xl'
                        , lg: {
                            flexDirection: 'row'
                            , justifyContent: 'space-between'
                            , alignItems: 'flex-start'
                            , marginBottom: '2xl'
                        }
                    } )
                }
            >
                <div>
                    <h1
                        className={
                            css( {
                                fontSize: '3xl'
                                , fontWeight: 'black'
                                , lineHeight: 'tight'
                                , textTransform: 'uppercase'
                                , sm: { fontSize: '4xl' }
                                , md: { fontSize: '5xl' }
                            } )
                        }
                    >
                        Marching Band
                    </h1>
                    <p
                        className={
                            css( {
                                fontSize: 'lg'
                                , fontWeight: 'medium'
                                , sm: { fontSize: 'xl' }
                                , md: { fontSize: '28px' }
                            } )
                        }
                    >
                        Previous Full Arrangements
                    </p>
                </div>
                <LinkButton
                    href='/build-your-own-show'
                    variant='outlineDark'
                    size='lg'
                    rounded='md'
                    className={
                        css( {
                            width: '100%'
                            , md: { width: 'auto' }
                        } )
                    }
                >
                    Build Your Own Show
                </LinkButton>
            </div>
            <ShowsGrid shows={ sortedShows } />
        </main>
    );
}
