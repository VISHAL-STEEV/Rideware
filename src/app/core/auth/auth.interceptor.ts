import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'environments/environments/environment'; 


/**
 * Intercept
 *
 * @param req
 * @param next
 */
export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> =>
{
    const authService = inject(AuthService);
    
    // Clone the request object
    let newReq = req.clone();

    // Request
    //
    // If the access token didn't expire, add the Authorization header.
    // We won't add the Authorization header if the access token expired.
    // This will force the server to return a "401 Unauthorized" response
    // for the protected API routes which our response interceptor will
    // catch and delete the access token from the local storage while logging
    // the user out from the app.
    if ( authService.accessToken && !AuthUtils.isTokenExpired(authService.accessToken) )
    {
        // newReq = req.clone({
        //     headers: req.headers.set('Authorization', 'Bearer ' + authService.accessToken),
        // });
    }

    // Response
    return next(newReq).pipe(
        catchError((error) =>
        {
            // Catch "401 Unauthorized" responses
            if ( error instanceof HttpErrorResponse && error.status === 401 )
            {
                const token = localStorage.getItem('token');
                const refreshToken = localStorage.getItem('refreshToken');
            const token_data ={
              "Token":token,
              "RefreshToken": refreshToken,
              "ClientId": "ERPWebApp"
          }
          const http =inject(HttpClient)
          return http.post(`${environment.apiURL}User/ValidateRefreshToken`, token_data).pipe(
            map((res: any) => {
              const token = res.data.token;
              const refreshToken = res.data.refreshToken;

              localStorage.setItem('token', token);
              localStorage.setItem('refreshToken',refreshToken)

              return res;
            })
          );

          

  




                // // Sign out
                // authService.signOut();

                // // Reload the app
                // location.reload();


                console.log(error)
            }

            return throwError(error);
        }),
    );
};


