export type User = {
    id: string;
    name: string;
    email: string;
    referral_id: string | null;
    email_verified_at: string | null;
};

export type LoginResponse = {
    message: string;
    user: User
}

export type UserWithSubordinates = User & {
    _directSubordinates: number;
    _totalSubordinates: number;
    depth?: number;
};