'use client';

import { submitContactForm } from '../api/contactApi';
import type { ContactFormValues } from '../types';
import { useLeadForm } from './useLeadForm';

export const emptyContactValues: ContactFormValues = {
    name: ''
    , school: ''
    , location: ''
    , email: ''
    , phone: ''
    , service: ''
    , message: ''
};

export const useContactForm = () => {
    return useLeadForm( emptyContactValues, submitContactForm );
};
