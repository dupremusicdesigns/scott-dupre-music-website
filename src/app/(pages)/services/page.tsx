import { css } from '../../../../styled-system/css';
import { grid } from '../../../../styled-system/patterns';
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
