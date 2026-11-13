'use client';

import { submitShowForm } from '../api/contactApi';
import type { ShowFormValues } from '../types';
import { useLeadForm } from './useLeadForm';

export const emptyShowValues: ShowFormValues = {
    name: ''
    , school: ''
    , email: ''
    , movement1: ''
    , movement2: ''
    , movement3: ''
    , extra: ''
    , vision: ''
    , contactTime: ''
};

export const useShowForm = () => {
    return useLeadForm( emptyShowValues, submitShowForm );
};
