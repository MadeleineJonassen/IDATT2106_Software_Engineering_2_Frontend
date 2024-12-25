/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BankAccountDto } from './BankAccountDto';
export type SavingGoalDtoGeneralResponse = {
    title?: string;
    goalSum?: number;
    endingDate?: string;
    imageUrl?: string;
    id?: number;
    sourceBankAccount?: BankAccountDto;
    destinationBankAccount?: BankAccountDto;
    amountSaved?: number;
    state?: SavingGoalDtoGeneralResponse.state;
};
export namespace SavingGoalDtoGeneralResponse {
    export enum state {
        IN_PROGRESS = 'IN_PROGRESS',
        COMPLETED = 'COMPLETED',
        FAILED = 'FAILED',
    }
}

