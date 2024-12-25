/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TransactionCategoryDto } from '../models/TransactionCategoryDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TransactionCategoryControllerService {
    /**
     * @returns TransactionCategoryDto OK
     * @throws ApiError
     */
    public static getAllCategories(): CancelablePromise<Array<TransactionCategoryDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/secure/transactions/categories',
        });
    }
}
