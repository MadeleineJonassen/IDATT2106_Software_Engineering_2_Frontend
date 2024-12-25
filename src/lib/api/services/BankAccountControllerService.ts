/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProjectedDailyExpenseDto } from '../models/ProjectedDailyExpenseDto';
import type { TransactionDto } from '../models/TransactionDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BankAccountControllerService {
    /**
     * @param accountId
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    public static addTransactionToAccount(
        accountId: number,
        requestBody: TransactionDto,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/secure/accounts/{accountId}/transactions',
            path: {
                'accountId': accountId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param username
     * @param accountId
     * @param categoryId
     * @returns ProjectedDailyExpenseDto OK
     * @throws ApiError
     */
    public static getExpectedExpense(
        username: string,
        accountId: number,
        categoryId: number,
    ): CancelablePromise<ProjectedDailyExpenseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/secure/accounts/{username}/{accountId}/{categoryId}/expected-expense',
            path: {
                'username': username,
                'accountId': accountId,
                'categoryId': categoryId,
            },
        });
    }
}
