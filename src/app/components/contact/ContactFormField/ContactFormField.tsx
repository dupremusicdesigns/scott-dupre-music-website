import type { ReactNode } from 'react';
import {
    contactErrorStyles
    , contactLabelStyles
    , contactOptionalStyles
} from '../contactFormStyles';

type ContactFormFieldProps = {
    label: string;
    optional?: boolean;
    error?: string;
    children: ReactNode;
};

export const ContactFormField = ( {
    label
    , optional
    , error
    , children
}: ContactFormFieldProps ) => {
    return (
        <label className={ contactLabelStyles }>
            <span>
                { label }
                {
                    optional && (
                        <span className={ contactOptionalStyles }>
                            Optional
                        </span>
                    )
                }
            </span>
            { children }
            {
                error && (
                    <span
                        role='alert'
                        className={ contactErrorStyles }
                    >
                        { error }
                    </span>
                )
            }
        </label>
    );
};
