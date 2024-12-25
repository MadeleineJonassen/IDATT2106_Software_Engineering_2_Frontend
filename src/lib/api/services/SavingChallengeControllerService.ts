/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SavingChallengeRequestDto } from '../models/SavingChallengeRequestDto';
import type { SavingChallengeResponseDto } from '../models/SavingChallengeResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SavingChallengeControllerService {
    /**
     * @param username
     * @param challengeId
     * @returns SavingChallengeResponseDto OK
     * @throws ApiError
     */
    public static completeChallenge(
        username: string,
        challengeId: number,
    ): CancelablePromise<SavingChallengeResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/secure/users/{username}/{challengeId}/transfer',
            path: {
                'username': username,
                'challengeId': challengeId,
            },
        });
    }
    /**
     * @param goalId
     * @param username
     * @returns SavingChallengeResponseDto OK
     * @throws ApiError
     */
    public static getAllChallengesInGoal(
        goalId: string,
        username: string,
    ): CancelablePromise<Array<SavingChallengeResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/secure/users/{username}/goals/{goalId}/challenges',
            path: {
                'goalId': goalId,
                'username': username,
            },
        });
    }
    /**
     * @param goalId
     * @param username
     * @param requestBody
     * @returns SavingChallengeResponseDto OK
     * @throws ApiError
     */
    public static createSavingChallenge(
        goalId: string,
        username: string,
        requestBody: SavingChallengeRequestDto,
    ): CancelablePromise<SavingChallengeResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/secure/users/{username}/goals/{goalId}/challenges',
            path: {
                'goalId': goalId,
                'username': username,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param username
     * @param goalId
     * @returns SavingChallengeResponseDto OK
     * @throws ApiError
     */
    public static getSavingChallengeSuggestion(
        username: string,
        goalId: number,
    ): CancelablePromise<Array<SavingChallengeResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/secure/users/{username}/goals/{goalId}/suggestions',
            path: {
                'username': username,
                'goalId': goalId,
            },
        });
    }
    /**
     * @param username
     * @returns SavingChallengeResponseDto OK
     * @throws ApiError
     */
    public static getAllChallengesInUser(
        username: string,
    ): CancelablePromise<Array<SavingChallengeResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/secure/users/{username}/challenges',
            path: {
                'username': username,
            },
        });
    }
}
