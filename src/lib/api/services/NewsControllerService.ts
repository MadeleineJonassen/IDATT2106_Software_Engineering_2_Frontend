/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NewsArticleDto } from '../models/NewsArticleDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NewsControllerService {
    /**
     * @returns NewsArticleDto OK
     * @throws ApiError
     */
    public static getNews(): CancelablePromise<Array<NewsArticleDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/secure/news',
        });
    }
}
