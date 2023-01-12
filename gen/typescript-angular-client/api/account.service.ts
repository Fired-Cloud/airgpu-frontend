/**
 * airgpu
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

import { Account } from '../model/models';
import { AccountParams } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


export interface CreateAccountRequestParams {
    /** Account creation parameters */
    accountParams?: AccountParams;
}

export interface DeleteAccountRequestParams {
    /** The identifier of the object to get */
    id: string;
}

export interface GetAccountRequestParams {
    /** The identifier of the object to get */
    id: string;
}

export interface ListAccountsRequestParams {
    /** Sort results by the specified properties and orders */
    sort?: string;
    /** Limit the number of results returned */
    limit?: number;
    /** Skip the given number of results */
    skip?: number;
    /** Filter results by id */
    id?: string;
    /** Filter results by created_at */
    createdAt?: any;
    /** Filter results by plan */
    plan?: string;
    /** Filter results by subscription */
    subscription?: string;
    /** Filter results by email */
    email?: string;
    /** Filter results by subscription_started_at */
    subscriptionStartedAt?: any;
    /** Filter results by credit */
    credit?: any;
    /** Filter results by vat_rate */
    vatRate?: any;
    /** Filter results by max_session_length */
    maxSessionLength?: any;
    /** Filter results by monthly_purchase_limit */
    monthlyPurchaseLimit?: any;
    /** Filter results by marketing_consent */
    marketingConsent?: boolean;
    /** Filter results by referral_code */
    referralCode?: string;
    /** Filter results by max_machines */
    maxMachines?: any;
}

export interface UpdateAccountRequestParams {
    /** The identifier of the object to get */
    id: string;
    /** Account update parameters */
    accountParams?: AccountParams;
}


@Injectable({
  providedIn: 'root'
})
export class AccountService {

    protected basePath = 'https://apis.stackprint.io/airgpu';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }


    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key,
                        (value as Date).toISOString().substr(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * Create a new account
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createAccount(requestParameters: CreateAccountRequestParams, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<Account>;
    public createAccount(requestParameters: CreateAccountRequestParams, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<Account>>;
    public createAccount(requestParameters: CreateAccountRequestParams, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<Account>>;
    public createAccount(requestParameters: CreateAccountRequestParams, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        const accountParams = requestParameters.accountParams;

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (apiKeyAuth) required
        credential = this.configuration.lookupCredential('apiKeyAuth');
        if (credential) {
            headers = headers.set('API-Key', credential);
        }

        // authentication (tokenAuth) required
        credential = this.configuration.lookupCredential('tokenAuth');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.post<Account>(`${this.configuration.basePath}/accounts`,
            accountParams,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete a account
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteAccount(requestParameters: DeleteAccountRequestParams, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<any>;
    public deleteAccount(requestParameters: DeleteAccountRequestParams, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<any>>;
    public deleteAccount(requestParameters: DeleteAccountRequestParams, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<any>>;
    public deleteAccount(requestParameters: DeleteAccountRequestParams, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        const id = requestParameters.id;
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteAccount.');
        }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (apiKeyAuth) required
        credential = this.configuration.lookupCredential('apiKeyAuth');
        if (credential) {
            headers = headers.set('API-Key', credential);
        }

        // authentication (tokenAuth) required
        credential = this.configuration.lookupCredential('tokenAuth');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.delete<any>(`${this.configuration.basePath}/accounts/${encodeURIComponent(String(id))}`,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get a single account
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAccount(requestParameters: GetAccountRequestParams, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<Account>;
    public getAccount(requestParameters: GetAccountRequestParams, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<Account>>;
    public getAccount(requestParameters: GetAccountRequestParams, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<Account>>;
    public getAccount(requestParameters: GetAccountRequestParams, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        const id = requestParameters.id;
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getAccount.');
        }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (apiKeyAuth) required
        credential = this.configuration.lookupCredential('apiKeyAuth');
        if (credential) {
            headers = headers.set('API-Key', credential);
        }

        // authentication (tokenAuth) required
        credential = this.configuration.lookupCredential('tokenAuth');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<Account>(`${this.configuration.basePath}/accounts/${encodeURIComponent(String(id))}`,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List accounts
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public listAccounts(requestParameters: ListAccountsRequestParams, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<Array<Account>>;
    public listAccounts(requestParameters: ListAccountsRequestParams, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<Array<Account>>>;
    public listAccounts(requestParameters: ListAccountsRequestParams, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<Array<Account>>>;
    public listAccounts(requestParameters: ListAccountsRequestParams, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        const sort = requestParameters.sort;
        const limit = requestParameters.limit;
        const skip = requestParameters.skip;
        const id = requestParameters.id;
        const createdAt = requestParameters.createdAt;
        const plan = requestParameters.plan;
        const subscription = requestParameters.subscription;
        const email = requestParameters.email;
        const subscriptionStartedAt = requestParameters.subscriptionStartedAt;
        const credit = requestParameters.credit;
        const vatRate = requestParameters.vatRate;
        const maxSessionLength = requestParameters.maxSessionLength;
        const monthlyPurchaseLimit = requestParameters.monthlyPurchaseLimit;
        const marketingConsent = requestParameters.marketingConsent;
        const referralCode = requestParameters.referralCode;
        const maxMachines = requestParameters.maxMachines;

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (sort !== undefined && sort !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>sort, 'sort');
        }
        if (limit !== undefined && limit !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>limit, 'limit');
        }
        if (skip !== undefined && skip !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>skip, 'skip');
        }
        if (id !== undefined && id !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>id, 'id');
        }
        if (createdAt !== undefined && createdAt !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>createdAt, 'created_at');
        }
        if (plan !== undefined && plan !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>plan, 'plan');
        }
        if (subscription !== undefined && subscription !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>subscription, 'subscription');
        }
        if (email !== undefined && email !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>email, 'email');
        }
        if (subscriptionStartedAt !== undefined && subscriptionStartedAt !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>subscriptionStartedAt, 'subscription_started_at');
        }
        if (credit !== undefined && credit !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>credit, 'credit');
        }
        if (vatRate !== undefined && vatRate !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>vatRate, 'vat_rate');
        }
        if (maxSessionLength !== undefined && maxSessionLength !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>maxSessionLength, 'max_session_length');
        }
        if (monthlyPurchaseLimit !== undefined && monthlyPurchaseLimit !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>monthlyPurchaseLimit, 'monthly_purchase_limit');
        }
        if (marketingConsent !== undefined && marketingConsent !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>marketingConsent, 'marketing_consent');
        }
        if (referralCode !== undefined && referralCode !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>referralCode, 'referral_code');
        }
        if (maxMachines !== undefined && maxMachines !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>maxMachines, 'max_machines');
        }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (apiKeyAuth) required
        credential = this.configuration.lookupCredential('apiKeyAuth');
        if (credential) {
            headers = headers.set('API-Key', credential);
        }

        // authentication (tokenAuth) required
        credential = this.configuration.lookupCredential('tokenAuth');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<Array<Account>>(`${this.configuration.basePath}/accounts`,
            {
                params: queryParameters,
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update an existing account
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateAccount(requestParameters: UpdateAccountRequestParams, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<Account>;
    public updateAccount(requestParameters: UpdateAccountRequestParams, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<Account>>;
    public updateAccount(requestParameters: UpdateAccountRequestParams, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<Account>>;
    public updateAccount(requestParameters: UpdateAccountRequestParams, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        const id = requestParameters.id;
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateAccount.');
        }
        const accountParams = requestParameters.accountParams;

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (apiKeyAuth) required
        credential = this.configuration.lookupCredential('apiKeyAuth');
        if (credential) {
            headers = headers.set('API-Key', credential);
        }

        // authentication (tokenAuth) required
        credential = this.configuration.lookupCredential('tokenAuth');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.put<Account>(`${this.configuration.basePath}/accounts/${encodeURIComponent(String(id))}`,
            accountParams,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
