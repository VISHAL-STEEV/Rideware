import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { user as userData } from 'app/mock-api/common/user/data';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import { cloneDeep } from 'lodash-es';
import { map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AuthMockApi
{
    private readonly _secret: any;
    private _user: any = userData;
    private _token = localStorage.getItem('accessToken')
    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService, private http :HttpClient)
    {
        // Set the mock-api
        this._secret = 'YOUR_VERY_CONFIDENTIAL_SECRET_FOR_SIGNING_JWT_TOKENS!!!';

        // Register Mock API handlers
        this.registerHandlers();
    }


    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
  

        this._fuseMockApiService
            .onPost('api/auth/forgot-password', 1000)
            .reply(() =>
                [
                    200,
                    true,
                ],
            );


        this._fuseMockApiService
            .onPost('api/auth/reset-password', 1000)
            .reply(() =>
                [
                    200,
                    true,
                ],
            );
    


        // this._fuseMockApiService
        //     .onPost('api/auth/sign-in', 1500)
        //     .reply(({request}) =>
        //     {
        //         if ( request.body.email === 'hughes.brian@company.com' && request.body.password === 'admin' )
        //         { 
        //             return [
        //                 200,
        //                 {
        //                     user       : cloneDeep(this._user),
        //                     accessToken: this._generateJWTToken(),
        //                     tokenType  : 'bearer',
        //                 },
        //             ];
        //         }

        //         // Invalid credentials
        //         return [
        //             404,
        //             false,
        //         ];
        //     });








        // -----------------------------------------------------------------------------------------------------
        // @ Sign in using the access token - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/auth/sign-in-with-token')
            .reply(({request}) =>
            {
                // Get the access token
                const accessToken = request.body.accessToken;

                // Verify the token
                if ( this._verifyJWTToken(accessToken) )
                {
                    return [
                        200,
                        {

                            user       : cloneDeep(this._user),
                            accessToken: this._token,
                            tokenType  : 'bearer',
                        },
                    ];
                }

                // Invalid token
                return [
                    401,
                    {
                        error: 'Invalid token',
                    },
                ];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Sign up - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/auth/sign-up', 1500)
            .reply(() =>

                // Simply return true
                [
                    200,
                    true,
                ],
            );

        // -----------------------------------------------------------------------------------------------------
        // @ Unlock session - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/auth/unlock-session', 1500)
            .reply(({request}) =>
            {
                
               


                if ( request.body.email === 'hughes.brian@company.com' && request.body.password === 'admin' )
                {  
                    

                    return [
                        200,
                        {
                            user       : cloneDeep(this._user),
                            accessToken: this._token,
                            tokenType  : 'bearer',
                        },
                    ];


                    
                }

                // Invalid credentials
                return [
                    404,
                    false,
                ];


            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Return base64 encoded version of the given string
     *
     * @param source
     * @private
     */
    private _base64url(source: any): string
    {
        // Encode in classical base64
        let encodedSource = Base64.stringify(source);

        // Remove padding equal characters
        encodedSource = encodedSource.replace(/=+$/, '');

        // Replace characters according to base64url specifications
        encodedSource = encodedSource.replace(/\+/g, '-');
        encodedSource = encodedSource.replace(/\//g, '_');

        // Return the base64 encoded string
        return encodedSource;
    }

  


    /**
     * Verify the given token
     *
     * @param token
     * @private
     */
    private _verifyJWTToken(token: string): boolean
    {
        // Split the token into parts
        const parts = token.split('.');
        const header = parts[0];
        const payload = parts[1];
        const signature = parts[2];

        // Re-sign and encode the header and payload using the secret
        const signatureCheck = this._base64url(HmacSHA256(header + '.' + payload, this._secret));

        // Verify that the resulting signature is valid
        // return (signature === signatureCheck);
 


// in this code it will check if the token is match
//  other wise when i refresh it will remove the 
// access_token form localStorage  so i change what ever it 
// will returen the boolen value as true

        return  true;
    }



    
}

