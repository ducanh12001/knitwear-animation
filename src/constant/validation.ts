export const MESSAGES = {
  REQUIRED: 'The field cannot be empty',
  INVALID_EMAIL: 'Enter a valid email address',
  INVALID_PHONE: 'Enter a valid phone number',
  ACCEPT_PRIVACY: 'Accept our privacy policy',
  MIN_LENGTH: (label: string, min: number) =>
    `${label} must be at least ${min} characters`,
  MAX_LENGTH: (max: number) => `Maximum ${max} characters allowed`,
} as const;

export const VALIDATION = {
  REQUIRED: { required: MESSAGES.REQUIRED },
  EMAIL: {
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: MESSAGES.INVALID_EMAIL,
    },
  },
  PHONE: {
    pattern: {
      value: /^\+?[0-9\s-]+$/,
      message: MESSAGES.INVALID_PHONE,
    },
  },
  MIN_LENGTH: (label: string, min: number) => ({
    minLength: {
      value: min,
      message: MESSAGES.MIN_LENGTH(label, min),
    },
  }),
  MAX_LENGTH: (max: number) => ({
    maxLength: {
      value: max,
      message: MESSAGES.MAX_LENGTH(max),
    },
  }),
} as const;
