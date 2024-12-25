/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SavingGoalDtoDetailsResponse } from '../models/SavingGoalDtoDetailsResponse';
import type { SavingGoalDtoGeneralResponse } from '../models/SavingGoalDtoGeneralResponse';
import type { SavingGoalDtoPost } from '../models/SavingGoalDtoPost';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SavingGoalControllerService {
    /**
     * @param username
     * @returns SavingGoalDtoGeneralResponse OK
     * @throws ApiError
     */
    public static getAllSavingGoals(
        username: string,
    ): CancelablePromise<Array<SavingGoalDtoGeneralResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/secure/users/{username}/goals',
            path: {
                'username': username,
            },
        });
    }
    /**
     * @param username
     * @param requestBody
     * @returns SavingGoalDtoGeneralResponse OK
     * @throws ApiError
     */
    public static createSavingGoal(
        username: string,
        requestBody: SavingGoalDtoPost,
    ): CancelablePromise<SavingGoalDtoGeneralResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/secure/users/{username}/goals',
            path: {
                'username': username,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param goalId
     * @param username
     * @returns SavingGoalDtoDetailsResponse OK
     * @throws ApiError
     */
    public static getSavingGoal(
        goalId: string,
        username: string,
    ): CancelablePromise<SavingGoalDtoDetailsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/secure/users/{username}/goals/{goalId}',
            path: {
                'goalId': goalId,
                'username': username,
            },
        });
    }
    /**
     * @param username
     * @param goalId
     * @param requestBody
     * @returns SavingGoalDtoGeneralResponse OK
     * @throws ApiError
     */
    public static editSavingGoal(
        username: string,
        goalId: string,
        requestBody: SavingGoalDtoPost,
    ): CancelablePromise<SavingGoalDtoGeneralResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/secure/users/{username}/goals/{goalId}',
            path: {
                'username': username,
                'goalId': goalId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
