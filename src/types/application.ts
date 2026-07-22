export type PreferredContactMethod = 'Phone call' | 'Text message' | 'Email' | '';

export type YesNoPrivate = 'Yes' | 'No' | 'Prefer to discuss privately' | '';
export type YesNo = 'Yes' | 'No' | '';

export type ResidentApplicationData = {
  personal: {
    legalFirstName: string;
    middleName: string;
    legalLastName: string;
    preferredName: string;
    dateOfBirth: string;
    phone: string;
    email: string;
    currentCity: string;
    currentState: string;
    preferredContactMethod: PreferredContactMethod;
    preferredMoveInDate: string;
    heardAbout: string;
    referralSource: string;
  };
  readiness: {
    currentLivingSituation: string;
    maintainingSobriety: YesNoPrivate;
    sobrietyStartDate: string;
    willingAbstinence: YesNo;
    willingHouseRules: YesNo;
    willingScreening: 'Yes' | 'No' | 'Need more information' | '';
    participatingProgram: YesNo;
    programName: string;
    programContactName: string;
    programContactInfo: string;
    programPermissionToContact: boolean;
    legalSupervision: YesNoPrivate;
    supervisingAgency: string;
    officerContactName: string;
    officerContactInfo: string;
    legalPermissionToContact: boolean;
    accessibilityAccommodation: YesNoPrivate;
    medicationPolicyDiscussion: YesNoPrivate;
  };
  practical: {
    employmentStatus: string;
    incomeSupportSource: string;
    reliableTransportation: YesNo;
    transportationAssistance: YesNo;
    canMeetFinancialRequirements: 'Yes' | 'No' | 'Need information about fees' | '';
    emergencyContactName: string;
    emergencyContactRelationship: string;
    emergencyContactPhone: string;
    emergencyContactEmail: string;
    soberLivingGoals: string;
    graceCottageInterest: string;
    additionalInformation: string;
  };
  consent: {
    accurateInfo: boolean;
    noGuarantee: boolean;
    mayContact: boolean;
    agreePolicies: boolean;
    authorizedContacts: boolean;
    privacyNotice: boolean;
    legalSignature: string;
    dateSigned: string;
    consentToSubmit: boolean;
  };
  website?: string;
};

export type ApplicationErrors = Record<string, string>;

export type ApplicationSubmitResponse = {
  ok: boolean;
  referenceNumber?: string;
  message?: string;
  errors?: ApplicationErrors;
  emailNotificationsSent?: boolean;
};
