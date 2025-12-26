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
                    , paddingTop: '2xl'
                    , paddingBottom: '120px'
                } )
            }
        >
            <div
                className={
                    css( {
                        display: 'flex'
                        , justifyContent: 'space-between'
                        , alignItems: 'flex-start'
                        , marginBottom: '2xl'
                    } )
                }
            >
                <div>
                    <h1
                        className={
                            css( {
                                fontSize: '5xl'
                                , fontWeight: 'black'
                                , lineHeight: 'tight'
                                , textTransform: 'uppercase'
                            } )
                        }
                    >
                        Marching Band
                    </h1>
                    <p
                        className={
                            css( {
                                fontSize: '28px'
                                , fontWeight: 'medium'
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
                >
                    Build Your Own Show
                </LinkButton>
            </div>
            <ShowsGrid shows={ sortedShows } />
        </main>
    );
}
