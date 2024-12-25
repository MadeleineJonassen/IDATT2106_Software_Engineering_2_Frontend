/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BankAccountDto } from '../models/BankAccountDto';
import type { UserDetails } from '../models/UserDetails';
import type { UserDetailsRequestDto } from '../models/UserDetailsRequestDto';
import type { UserDto } from '../models/UserDto';
import type { UserLeaderboardDto } from '../models/UserLeaderboardDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserControllerService {
    /**
     * @param requestBody
     * @returns UserDto OK
     * @throws ApiError
     */
    public static saveUser(
        requestBody: UserDto,
    ): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/secure/users',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param username
     * @returns UserDetails OK
     * @throws ApiError
     */
    public static getUserDetails(
        username: string,
    ): CancelablePromise<UserDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/secure/users/{username}',
            path: {
                'username': username,
            },
        });
    }
    /**
     * @param username
     * @param requestBody
     * @returns UserDto OK
     * @throws ApiError
     */
    public static updateUser(
        username: string,
        requestBody: UserDetailsRequestDto,
    ): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/secure/users/{username}',
            path: {
                'username': username,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param username
     * @returns BankAccountDto OK
     * @throws ApiError
     */
    public static getAllBankAccountsByUser(
        username: string,
    ): CancelablePromise<Array<BankAccountDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/secure/users/{username}/accounts',
            path: {
                'username': username,
            },
        });
    }
    /**
     * @returns UserLeaderboardDto OK
     * @throws ApiError
     */
    public static getGlobalLeaderboard(): CancelablePromise<Array<UserLeaderboardDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/secure/users/leaderboard',
        });
    }
}
