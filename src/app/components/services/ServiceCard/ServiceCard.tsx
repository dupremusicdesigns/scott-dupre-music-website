import { ReactNode } from 'react';
import { css } from '../../../../../styled-system/css';

type ServiceCardProps = {
    title: string;
    description: string;
    icon: ReactNode;
}

export const ServiceCard = ( {
    title
    , description
    , icon
}: ServiceCardProps ) => (
    <div
        className={
            css( {
                display: 'flex'
                , alignItems: 'flex-start'
                , gap: 'md'
                , padding: 'lg'
                , border: '2px solid'
                , borderColor: 'brand.black'
                , borderRadius: 'md'
            } )
        }
    >
        <div
            className={
                css( {
                    flexShrink: 0
                    , color: 'text.primary'
                } )
            }
        >
            { icon }
        </div>
        <div>
            <h3
                className={
                    css( {
                        fontSize: 'md'
                        , fontWeight: 'bold'
                        , color: 'text.primary'
                        , textTransform: 'uppercase'
                        , lineHeight: 'tight'
                    } )
                }
            >
                { title }
            </h3>
            <p
                className={
                    css( {
                        fontSize: 'sm'
                        , fontWeight: 'medium'
                        , color: 'text.primary'
                        , lineHeight: 'normal'
                        , marginTop: 'xs'
                    } )
                }
            >
                { description }
            </p>
        </div>
    </div>
);
