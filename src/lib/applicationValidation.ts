import type { ApplicationErrors, ResidentApplicationData } from '../types/application';

export const MAX_LONG_TEXT = 800;
export const MAX_SHORT_TEXT = 160;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9()\-\s.]{7,20}$/;

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const asRecord = (value: unknown): Record<string, unknown> => (isObject(value) ? value : {});

const cleanString = (value: unknown, maxLength = MAX_SHORT_TEXT): string => {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[<>]/g, '')
    .split('')
    .map((character) => {
      const code = character.charCodeAt(0);
      return code < 32 || code === 127 ? ' ' : character;
    })
    .join('')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
};

const cleanBoolean = (value: unknown): boolean => value === true;

const validDate = (value: string): boolean => {
  if (!value) return false;
  const date = new Date(`${value}T00:00:00`);
  return !Number.isNaN(date.getTime()) && value.length === 10;
};

const futureOrTodayDate = (value: string): boolean => {
  if (!validDate(value)) return false;
  const input = new Date(`${value}T00:00:00`).getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return input >= today.getTime();
};

const pastDate = (value: string): boolean => {
  if (!validDate(value)) return false;
  return new Date(`${value}T00:00:00`).getTime() <= Date.now();
};

export const sanitizeApplicationData = (input: unknown): ResidentApplicationData => {
  const source = asRecord(input);
  const personal = asRecord(source.personal);
  const readiness = asRecord(source.readiness);
  const practical = asRecord(source.practical);
  const consent = asRecord(source.consent);

  return {
    personal: {
      legalFirstName: cleanString(personal.legalFirstName),
      middleName: cleanString(personal.middleName),
      legalLastName: cleanString(personal.legalLastName),
      preferredName: cleanString(personal.preferredName),
      dateOfBirth: cleanString(personal.dateOfBirth, 10),
      phone: cleanString(personal.phone, 30),
      email: cleanString(personal.email, 120).toLowerCase(),
      currentCity: cleanString(personal.currentCity),
      currentState: cleanString(personal.currentState, 80),
      preferredContactMethod: cleanString(personal.preferredContactMethod, 40) as ResidentApplicationData['personal']['preferredContactMethod'],
      preferredMoveInDate: cleanString(personal.preferredMoveInDate, 10),
      heardAbout: cleanString(personal.heardAbout),
      referralSource: cleanString(personal.referralSource),
    },
    readiness: {
      currentLivingSituation: cleanString(readiness.currentLivingSituation),
      maintainingSobriety: cleanString(readiness.maintainingSobriety, 40) as ResidentApplicationData['readiness']['maintainingSobriety'],
      sobrietyStartDate: cleanString(readiness.sobrietyStartDate, 10),
      willingAbstinence: cleanString(readiness.willingAbstinence, 10) as ResidentApplicationData['readiness']['willingAbstinence'],
      willingHouseRules: cleanString(readiness.willingHouseRules, 10) as ResidentApplicationData['readiness']['willingHouseRules'],
      willingScreening: cleanString(readiness.willingScreening, 40) as ResidentApplicationData['readiness']['willingScreening'],
      participatingProgram: cleanString(readiness.participatingProgram, 10) as ResidentApplicationData['readiness']['participatingProgram'],
      programName: cleanString(readiness.programName),
      programContactName: cleanString(readiness.programContactName),
      programContactInfo: cleanString(readiness.programContactInfo),
      programPermissionToContact: cleanBoolean(readiness.programPermissionToContact),
      legalSupervision: cleanString(readiness.legalSupervision, 40) as ResidentApplicationData['readiness']['legalSupervision'],
      supervisingAgency: cleanString(readiness.supervisingAgency),
      officerContactName: cleanString(readiness.officerContactName),
      officerContactInfo: cleanString(readiness.officerContactInfo),
      legalPermissionToContact: cleanBoolean(readiness.legalPermissionToContact),
      accessibilityAccommodation: cleanString(readiness.accessibilityAccommodation, 40) as ResidentApplicationData['readiness']['accessibilityAccommodation'],
      medicationPolicyDiscussion: cleanString(readiness.medicationPolicyDiscussion, 40) as ResidentApplicationData['readiness']['medicationPolicyDiscussion'],
    },
    practical: {
      employmentStatus: cleanString(practical.employmentStatus),
      incomeSupportSource: cleanString(practical.incomeSupportSource),
      reliableTransportation: cleanString(practical.reliableTransportation, 10) as ResidentApplicationData['practical']['reliableTransportation'],
      transportationAssistance: cleanString(practical.transportationAssistance, 10) as ResidentApplicationData['practical']['transportationAssistance'],
      canMeetFinancialRequirements: cleanString(practical.canMeetFinancialRequirements, 40) as ResidentApplicationData['practical']['canMeetFinancialRequirements'],
      emergencyContactName: cleanString(practical.emergencyContactName),
      emergencyContactRelationship: cleanString(practical.emergencyContactRelationship),
      emergencyContactPhone: cleanString(practical.emergencyContactPhone, 30),
      emergencyContactEmail: cleanString(practical.emergencyContactEmail, 120).toLowerCase(),
      soberLivingGoals: cleanString(practical.soberLivingGoals, MAX_LONG_TEXT),
      graceCottageInterest: cleanString(practical.graceCottageInterest, MAX_LONG_TEXT),
      additionalInformation: cleanString(practical.additionalInformation, MAX_LONG_TEXT),
    },
    consent: {
      accurateInfo: cleanBoolean(consent.accurateInfo),
      noGuarantee: cleanBoolean(consent.noGuarantee),
      mayContact: cleanBoolean(consent.mayContact),
      agreePolicies: cleanBoolean(consent.agreePolicies),
      authorizedContacts: cleanBoolean(consent.authorizedContacts),
      privacyNotice: cleanBoolean(consent.privacyNotice),
      legalSignature: cleanString(consent.legalSignature),
      dateSigned: cleanString(consent.dateSigned, 10),
      consentToSubmit: cleanBoolean(consent.consentToSubmit),
    },
    website: cleanString(source.website, 120),
  };
};

const requireValue = (errors: ApplicationErrors, key: string, value: string, label: string) => {
  if (!value) errors[key] = `${label} is required.`;
};

const requireBoolean = (errors: ApplicationErrors, key: string, value: boolean, label: string) => {
  if (!value) errors[key] = `${label} is required.`;
};

export const validateApplicationStep = (data: ResidentApplicationData, step: number): ApplicationErrors => {
  const errors: ApplicationErrors = {};

  if (step === 0) {
    requireValue(errors, 'personal.legalFirstName', data.personal.legalFirstName, 'Legal first name');
    requireValue(errors, 'personal.legalLastName', data.personal.legalLastName, 'Legal last name');
    requireValue(errors, 'personal.dateOfBirth', data.personal.dateOfBirth, 'Date of birth');
    requireValue(errors, 'personal.phone', data.personal.phone, 'Phone number');
    requireValue(errors, 'personal.email', data.personal.email, 'Email address');
    requireValue(errors, 'personal.currentCity', data.personal.currentCity, 'Current city');
    requireValue(errors, 'personal.currentState', data.personal.currentState, 'Current state');
    requireValue(errors, 'personal.preferredContactMethod', data.personal.preferredContactMethod, 'Preferred contact method');
    requireValue(errors, 'personal.preferredMoveInDate', data.personal.preferredMoveInDate, 'Preferred move-in date');

    if (data.personal.email && !emailPattern.test(data.personal.email)) errors['personal.email'] = 'Enter a valid email address.';
    if (data.personal.phone && !phonePattern.test(data.personal.phone)) errors['personal.phone'] = 'Enter a valid phone number.';
    if (data.personal.dateOfBirth && !pastDate(data.personal.dateOfBirth)) errors['personal.dateOfBirth'] = 'Enter a valid date of birth.';
    if (data.personal.preferredMoveInDate && !futureOrTodayDate(data.personal.preferredMoveInDate)) {
      errors['personal.preferredMoveInDate'] = 'Enter today or a future move-in date.';
    }
  }

  if (step === 1) {
    requireValue(errors, 'readiness.currentLivingSituation', data.readiness.currentLivingSituation, 'Current living situation');
    requireValue(errors, 'readiness.maintainingSobriety', data.readiness.maintainingSobriety, 'Sobriety status');
    requireValue(errors, 'readiness.willingAbstinence', data.readiness.willingAbstinence, 'Abstinence agreement');
    requireValue(errors, 'readiness.willingHouseRules', data.readiness.willingHouseRules, 'House rules agreement');
    requireValue(errors, 'readiness.willingScreening', data.readiness.willingScreening, 'Substance screening response');
    requireValue(errors, 'readiness.participatingProgram', data.readiness.participatingProgram, 'Program participation response');
    requireValue(errors, 'readiness.legalSupervision', data.readiness.legalSupervision, 'Legal supervision response');
    requireValue(errors, 'readiness.accessibilityAccommodation', data.readiness.accessibilityAccommodation, 'Accessibility accommodation response');
    requireValue(errors, 'readiness.medicationPolicyDiscussion', data.readiness.medicationPolicyDiscussion, 'Medication-policy response');

    if (data.readiness.sobrietyStartDate && !pastDate(data.readiness.sobrietyStartDate)) {
      errors['readiness.sobrietyStartDate'] = 'Enter a valid sobriety start date or leave it blank.';
    }
  }

  if (step === 2) {
    requireValue(errors, 'practical.employmentStatus', data.practical.employmentStatus, 'Employment status');
    requireValue(errors, 'practical.reliableTransportation', data.practical.reliableTransportation, 'Reliable transportation response');
    requireValue(errors, 'practical.transportationAssistance', data.practical.transportationAssistance, 'Transportation assistance response');
    requireValue(errors, 'practical.canMeetFinancialRequirements', data.practical.canMeetFinancialRequirements, 'Financial requirements response');
    requireValue(errors, 'practical.emergencyContactName', data.practical.emergencyContactName, 'Emergency contact full name');
    requireValue(errors, 'practical.emergencyContactRelationship', data.practical.emergencyContactRelationship, 'Emergency contact relationship');
    requireValue(errors, 'practical.emergencyContactPhone', data.practical.emergencyContactPhone, 'Emergency contact phone number');
    requireValue(errors, 'practical.soberLivingGoals', data.practical.soberLivingGoals, 'Primary goals for sober living');
    requireValue(errors, 'practical.graceCottageInterest', data.practical.graceCottageInterest, 'Interest in Grace Cottage');

    if (data.practical.emergencyContactPhone && !phonePattern.test(data.practical.emergencyContactPhone)) {
      errors['practical.emergencyContactPhone'] = 'Enter a valid emergency contact phone number.';
    }
    if (data.practical.emergencyContactEmail && !emailPattern.test(data.practical.emergencyContactEmail)) {
      errors['practical.emergencyContactEmail'] = 'Enter a valid emergency contact email address.';
    }
  }

  if (step === 3) {
    requireBoolean(errors, 'consent.accurateInfo', data.consent.accurateInfo, 'Accuracy acknowledgment');
    requireBoolean(errors, 'consent.noGuarantee', data.consent.noGuarantee, 'Admission acknowledgment');
    requireBoolean(errors, 'consent.mayContact', data.consent.mayContact, 'Contact acknowledgment');
    requireBoolean(errors, 'consent.agreePolicies', data.consent.agreePolicies, 'Policy acknowledgment');
    requireBoolean(errors, 'consent.authorizedContacts', data.consent.authorizedContacts, 'Contact authorization acknowledgment');
    requireBoolean(errors, 'consent.privacyNotice', data.consent.privacyNotice, 'Privacy notice acknowledgment');
    requireValue(errors, 'consent.legalSignature', data.consent.legalSignature, 'Typed legal signature');
    requireValue(errors, 'consent.dateSigned', data.consent.dateSigned, 'Date signed');
    requireBoolean(errors, 'consent.consentToSubmit', data.consent.consentToSubmit, 'Consent checkbox');

    if (data.consent.dateSigned && !validDate(data.consent.dateSigned)) errors['consent.dateSigned'] = 'Enter a valid signature date.';
  }

  return errors;
};

export const validateFullApplication = (data: ResidentApplicationData): ApplicationErrors => ({
  ...validateApplicationStep(data, 0),
  ...validateApplicationStep(data, 1),
  ...validateApplicationStep(data, 2),
  ...validateApplicationStep(data, 3),
});
