export const ROLES = {
    CREATOR:"creator",
    ADMIN:"admin",
    VIEWER:"viewer"
} as const;

export type ROLE = (typeof ROLES)[keyof typeof ROLES];