import { css } from '../../../../styled-system/css';
import { ServiceCard } from '../../components/services/ServiceCard/ServiceCard';
import { ServicesContactButton } from '../../components/services/ServicesContactButton/ServicesContactButton';
import { getServices } from '../../api/services';
import { getServiceIcon } from '../../constants/serviceIcons';

export default async function ServicesPage () {
    const { data: services } = await getServices();

    return (
        <main
            className={
                css( {
                    position: 'relative'
                    , width: '100%'
                    , backgroundColor: 'background.primary'
                    , paddingBottom: '2xl'
                    , md: { paddingBottom: '100px' }
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
                                fontSize: '4xl'
                                , fontWeight: 'black'
                                , lineHeight: 'tight'
                                , color: 'text.primary'
                                , textTransform: 'uppercase'
                                , sm: { fontSize: '5xl' }
                                , md: { fontSize: '6xl' }
                            } )
                        }
                    >
                        Services
                    </h1>
                </section>

                <section
                    className={
                        css( {
                            marginTop: 'xl'
                            , marginLeft: '7%'
                            , marginRight: '6%'
                            , md: { marginTop: '60px' }
                        } )
                    }
                >
                    <div
                        className={
                            css( {
                                display: 'grid'
                                , gridTemplateColumns: '1fr'
                                , gap: 'md'
                                , lg: { gridTemplateColumns: 'repeat(2, 1fr)' }
                                , xl: {
                                    gridTemplateColumns: 'repeat(3, 1fr)'
                                    , gap: 'lg'
                                }
                            } )
                        }
                    >
                        {
                            services.map( service => (
                                <ServiceCard
                                    key={ service.documentId }
                                    title={ service.title }
                                    description={ service.description }
                                    icon={ getServiceIcon( service.iconName || '' ) }
                                />
                            ) )
                        }
                    </div>
                    <div
                        className={
                            css( {
                                display: 'flex'
                                , justifyContent: 'center'
                                , marginTop: '3xl'
                            } )
                        }
                    >
                        <ServicesContactButton />
                    </div>
                </section>
            </div>
        </main>
    );
}
