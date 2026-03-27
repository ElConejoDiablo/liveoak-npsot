import "server-only";

type MembersPortalEnvName =
  | "DATABASE_URL"
  | "AUTH_SECRET"
  | "AUTH_EMAIL_FROM"
  | "AUTH_RESEND_API_KEY"
  | "NEXTAUTH_URL"
  | "BLOB_READ_WRITE_TOKEN";

type MembersPortalEnvValidation = {
  missing: MembersPortalEnvName[];
  invalid: MembersPortalEnvName[];
};

const MEMBERS_PORTAL_ENV_NAMES: MembersPortalEnvName[] = [
  "DATABASE_URL",
  "AUTH_SECRET",
  "AUTH_EMAIL_FROM",
  "AUTH_RESEND_API_KEY",
  "NEXTAUTH_URL",
  "BLOB_READ_WRITE_TOKEN",
];

const EMAIL_FROM_PATTERN =
  /^[^<>\r\n]+<\s*[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+\s*>$/;

function hasValue(value: string | undefined) {
  return Boolean(value?.trim());
}

function isValidDatabaseUrl(value: string | undefined) {
  const normalizedValue = value?.trim();

  if (!normalizedValue) {
    return false;
  }

  try {
    const url = new URL(normalizedValue);
    return Boolean(url.protocol && url.hostname);
  } catch {
    return false;
  }
}

function isValidNextAuthUrl(value: string | undefined) {
  const normalizedValue = value?.trim();

  if (!normalizedValue) {
    return false;
  }

  try {
    const url = new URL(normalizedValue);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidEmailFrom(value: string | undefined) {
  const normalizedValue = value?.trim();

  if (!normalizedValue) {
    return false;
  }

  return EMAIL_FROM_PATTERN.test(normalizedValue);
}

function validateEnvValue(name: MembersPortalEnvName, value: string | undefined) {
  switch (name) {
    case "DATABASE_URL":
      return isValidDatabaseUrl(value);
    case "AUTH_EMAIL_FROM":
      return isValidEmailFrom(value);
    case "NEXTAUTH_URL":
      return isValidNextAuthUrl(value);
    default:
      return hasValue(value);
  }
}

export function getMembersPortalEnvValidation(): MembersPortalEnvValidation {
  const missing: MembersPortalEnvName[] = [];
  const invalid: MembersPortalEnvName[] = [];

  for (const name of MEMBERS_PORTAL_ENV_NAMES) {
    const value = process.env[name];

    if (!hasValue(value)) {
      missing.push(name);
      continue;
    }

    if (!validateEnvValue(name, value)) {
      invalid.push(name);
    }
  }

  return { missing, invalid };
}

export function isMembersPortalConfigured() {
  const validation = getMembersPortalEnvValidation();
  return validation.missing.length === 0 && validation.invalid.length === 0;
}

export function getMembersPortalConfigurationError(context: string) {
  const validation = getMembersPortalEnvValidation();

  if (!validation.missing.length && !validation.invalid.length) {
    return null;
  }

  const details = [
    validation.missing.length
      ? `missing: ${validation.missing.join(", ")}`
      : null,
    validation.invalid.length
      ? `invalid: ${validation.invalid.join(", ")}`
      : null,
  ]
    .filter(Boolean)
    .join("; ");

  return new Error(`Members portal configuration error for ${context}: ${details}`);
}

export function requireServerEnv(name: MembersPortalEnvName) {
  const value = process.env[name];
  const normalizedValue = value?.trim();

  if (!normalizedValue) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  if (!validateEnvValue(name, normalizedValue)) {
    throw new Error(`Invalid environment variable format: ${name}`);
  }

  return normalizedValue;
}
