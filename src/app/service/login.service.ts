import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Error Handling
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

// Services
import { MessageService } from './message.service';

// Domains
import { BookLendingDomain } from '../typings/domain';
import BLAUser = BookLendingDomain.BLAUser;

@Injectable()
export class LoginService {

    private storageKeyUser: string = 'book-lending-app-user';
    private storageKeyJWT: string = 'book-lending-app-jwt';

    private currentUser: BLAUser;

    // USE YOUR API HERE. SHOULD BE SOMETHING LIKE 
    // https://<API_ID>.execute-api.<REGION>.amazonaws.com/<ENVIRONMENT>/registration
    private registerUrl: string = 'YOUR_API_HERE';
    // https://<API_ID>.execute-api.<REGION>.amazonaws.com/<ENVIRONMENT>/authentication
    private loginUrl: string = 'YOUR_API_HERE';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {
        let userId = this.getUser() || undefined;
        let token = this.getToken() || undefined;

        this.currentUser = {
            userId,
            token,
            isLoggedIn: (userId && token) ? true : false
        };
    }

    private setUser(user: string) {
        localStorage.setItem(this.storageKeyUser, user);
    }
    private getUser(): string {
        return localStorage.getItem(this.storageKeyUser);
    }
    private setToken(token: string) {
        localStorage.setItem(this.storageKeyJWT, token);
    }
    private getToken(): string {
        return localStorage.getItem(this.storageKeyJWT);
    }

    private handleError(error: HttpErrorResponse): ErrorObservable {
        if (error.error instanceof ErrorEvent) {
            // Client-side or network error. Handle it accordingly.
            console.error('An error occurred: ', error.error.message);
            this.messageService.add('Please check your network status.');
        } // else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        // console.error(
        //     `Backend returned code ${error.status}, ` +
        //     `body was: ${error.error}`);
        // }

        return new ErrorObservable(error.error);
    }

    public getCurrentUser(): BLAUser {
        return this.currentUser;
    }

    public login(user: string, password: string): Observable<boolean> {
        let myObs$ = new Observable<boolean>(observer => {
            let body = {
                userName: user,
                userPassword: password
            };
            this.http.post(this.loginUrl, JSON.stringify(body), this.httpOptions)
                .pipe(catchError(this.handleError.bind(this)))
                .subscribe(
                    data => {
                        this.currentUser.userId = user;
                        this.setUser(user);
                        this.currentUser.token = data['token'];
                        this.setToken(data['token']);
                        this.currentUser.isLoggedIn = true;
                        observer.next(true);
                        observer.complete();
                    },
                    error => {
                        observer.error();
                        observer.complete();
                    }
                );
        });
        return myObs$;
    }

    public logout(delay: number = 500): Observable<any> {
        let myObs$ = new Observable<boolean>(observer => {
            setTimeout(() => {
                this.currentUser.userId = undefined;
                localStorage.removeItem(this.storageKeyUser);
                this.currentUser.token = undefined;
                localStorage.removeItem(this.storageKeyJWT);
                this.currentUser.isLoggedIn = false;
                observer.next(true);
                observer.complete();
            }, delay);
        });
        return myObs$;
    }

    public register(user: string, password: string, confirmPassword: string): Observable<any> {
        let myObs$ = new Observable<any>(observer => {
            let body = {
                userName: user,
                userPassword: password,
                confirmPassword
            };
            this.http.post(this.registerUrl, JSON.stringify(body), this.httpOptions)
                .pipe(catchError(this.handleError.bind(this)))
                .subscribe(
                    success => {
                        observer.next(true);
                        observer.complete();
                    },
                    error => {
                        observer.error(error);
                        observer.complete();
                    }
                );
        });
        return myObs$;
    }

}
