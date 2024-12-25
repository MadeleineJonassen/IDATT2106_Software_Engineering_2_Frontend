/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BadgeProgressDto } from './BadgeProgressDto';
import type { BankAccountDto } from './BankAccountDto';
import type { CompletedBadgeDto } from './CompletedBadgeDto';
export type UserDetails = {
    id?: number;
    username?: string;
    email?: string;
    fullName?: string;
    imageUrl?: string;
    score?: number;
    subId?: string;
    preferredSavingsAccount?: BankAccountDto;
    preferredCheckingAccount?: BankAccountDto;
    badgeProgress?: Array<BadgeProgressDto>;
    completedBadges?: Array<CompletedBadgeDto>;
    completedChallenges?: number;
    completedGoals?: number;
    currentStreak?: number;
    lastCompletedChallengeDate?: string;
    lastStreakDate?: string;
    totalSaved?: number;
};

