import type { APIRequestContext } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';

export class ProductsClient extends BaseApiClient {

    constructor(request: APIRequestContext) {
        super(request);
    }

}
