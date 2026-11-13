export const LEAD_API_PATH = '/lead-api';
export const LEAD_FORM_HEADER = 'X-Lead-Form';

export const CONTACT_SERVICE_OPTIONS = [
    'Music for my marching band'
    , 'Stagger Breathing Score'
    , 'Buzzing Tracks or Fundamental Packets'
    , 'Buzzing Tracks'
    , 'Consulting'
    , 'Something Else!'
] as const;

export const LEAD_FAILURE_TEXT = {
    throttled: 'You have sent several messages already. Please try again tomorrow, or email me directly.'
    , unavailable: 'The form is not taking messages right now. Please email me directly instead.'
    , failed: 'Sorry, that did not go through. Please try again, or email me directly.'
};
