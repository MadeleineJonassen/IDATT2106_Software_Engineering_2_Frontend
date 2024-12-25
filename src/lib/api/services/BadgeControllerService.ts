/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BadgeDto } from '../models/BadgeDto';
import type { BadgeProgressDto } from '../models/BadgeProgressDto';
import type { CompletedBadgeDto } from '../models/CompletedBadgeDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BadgeControllerService {
    /**
     * @param username
     * @returns CompletedBadgeDto OK
     * @throws ApiError
     */
    public static getBadgesByUser(
        username: string,
    ): CancelablePromise<Array<CompletedBadgeDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/secure/users/{username}/badges',
            path: {
                'username': username,
            },
        });
    }
    /**
     * @param username
     * @returns BadgeProgressDto OK
     * @throws ApiError
     */
    public static getAllBadgeProgress(
        username: string,
    ): CancelablePromise<Array<BadgeProgressDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/secure/users/{username}/badges/progress',
            path: {
                'username': username,
            },
        });
    }
    /**
     * @returns BadgeDto OK
     * @throws ApiError
     */
    public static getAllBadges(): CancelablePromise<Array<BadgeDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/secure/badges',
        });
    }
}
