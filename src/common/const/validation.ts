export const MESSAGES = {
  REQUIRED: 'The field cannot be empty',
  INVALID_EMAIL: 'Enter a valid email address',
  ACCEPT_PRIVACY: 'Accept our privacy policy',
  MIN_LENGTH: (label: string, min: number) =>
    `${label} must be at least ${min} characters`,
  MAX_LENGTH: (max: number) => `Maximum ${max} characters allowed`,
} as const;
