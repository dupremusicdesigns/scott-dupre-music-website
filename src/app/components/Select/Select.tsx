'use client';

import { Select as BaseSelect } from '@base-ui/react/select';
import { ChevronDownIcon } from '../icons/ChevronDownIcon/ChevronDownIcon';
import {
    selectIconStyles
    , selectItemStyles
    , selectPopupStyles
    , selectPositionerStyles
    , selectTriggerStyles
} from './selectStyles';

type SelectProps = {
    name?: string;
    value: string;
    options: readonly string[];
    placeholder: string;
    onValueChange: ( value: string ) => void;
    label?: string;
    invalid?: boolean;
    disabled?: boolean;
};

export const Select = ( {
    name
    , value
    , options
    , placeholder
    , onValueChange
    , label
    , invalid
    , disabled
}: SelectProps ) => {
    return (
        <BaseSelect.Root
            name={ name }
            value={ value || null }
            onValueChange={ next => onValueChange( typeof next === 'string' ? next : '' ) }
            disabled={ disabled }
        >
            <BaseSelect.Trigger
                aria-label={ label }
                aria-invalid={ invalid || undefined }
                className={ selectTriggerStyles }
            >
                <BaseSelect.Value placeholder={ placeholder } />
                <BaseSelect.Icon className={ selectIconStyles }>
                    <ChevronDownIcon />
                </BaseSelect.Icon>
            </BaseSelect.Trigger>
            <BaseSelect.Portal>
                <BaseSelect.Positioner
                    alignItemWithTrigger={ false }
                    sideOffset={ 6 }
                    className={ selectPositionerStyles }
                >
                    <BaseSelect.Popup className={ selectPopupStyles }>
                        <BaseSelect.List>
                            {
                                options.map( option => (
                                    <BaseSelect.Item
                                        key={ option }
                                        value={ option }
                                        className={ selectItemStyles }
                                    >
                                        <BaseSelect.ItemText>
                                            { option }
                                        </BaseSelect.ItemText>
                                    </BaseSelect.Item>
                                ) )
                            }
                        </BaseSelect.List>
                    </BaseSelect.Popup>
                </BaseSelect.Positioner>
            </BaseSelect.Portal>
        </BaseSelect.Root>
    );
};
