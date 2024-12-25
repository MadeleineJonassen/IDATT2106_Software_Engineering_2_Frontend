/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BankAccountDto } from './BankAccountDto';
import type { SavingChallengeResponseDto } from './SavingChallengeResponseDto';
export type SavingGoalDtoDetailsResponse = {
    title?: string;
    goalSum?: number;
    endingDate?: string;
    imageUrl?: string;
    id?: number;
    sourceBankAccount?: BankAccountDto;
    destinationBankAccount?: BankAccountDto;
    savingChallenges?: Array<SavingChallengeResponseDto>;
    amountSaved?: number;
    state?: SavingGoalDtoDetailsResponse.state;
};
export namespace SavingGoalDtoDetailsResponse {
    export enum state {
        IN_PROGRESS = 'IN_PROGRESS',
        COMPLETED = 'COMPLETED',
        FAILED = 'FAILED',
    }
}

