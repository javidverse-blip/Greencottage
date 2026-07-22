export const contactMethods = ['Phone call', 'Text message', 'Email'];

export const currentLivingSituations = [
  'Treatment facility',
  'Transitional housing',
  'Staying with family or friends',
  'Independent housing',
  'Unhoused',
  'Other',
];

export const sobrietyResponses = ['Yes', 'No', 'Prefer to discuss privately'];
export const yesNo = ['Yes', 'No'];
export const screeningResponses = ['Yes', 'No', 'Need more information'];

export const employmentStatuses = [
  'Employed full-time',
  'Employed part-time',
  'Self-employed',
  'Seeking employment',
  'Student',
  'Disability or benefits',
  'Retired',
  'Other',
];

export const financialResponses = ['Yes', 'No', 'Need information about fees'];

export const acknowledgments = [
  ['accurateInfo', 'I certify that the information provided is accurate to the best of my knowledge.'],
  ['noGuarantee', 'I understand that submitting an application does not guarantee admission or placement.'],
  [
    'mayContact',
    'I understand that Grace Cottage may contact me to discuss availability, eligibility, house rules, fees, and next steps.',
  ],
  ['agreePolicies', 'I agree to follow Grace Cottage’s sober-living and residence policies if accepted.'],
  [
    'authorizedContacts',
    'I authorize Grace Cottage to contact the referral or supervision contacts I specifically gave permission to contact.',
  ],
  ['privacyNotice', 'I have reviewed and agree to the application privacy notice.'],
] as const;
