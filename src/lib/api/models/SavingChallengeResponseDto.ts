/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TransactionCategoryDto } from './TransactionCategoryDto';
export type SavingChallengeResponseDto = {
    expectedExpense?: number;
    spendingGoal?: number;
    startDate?: string;
    endingDate?: string;
    id?: number;
    transactionCategory?: TransactionCategoryDto;
    state?: SavingChallengeResponseDto.state;
    currentSpending?: number;
    amountSaved?: number;
};
export namespace SavingChallengeResponseDto {
    export enum state {
        IN_PROGRESS = 'IN_PROGRESS',
        COMPLETED = 'COMPLETED',
        COMPLETED_AND_TRANSFERRED = 'COMPLETED_AND_TRANSFERRED',
        FAILED = 'FAILED',
    }
}

