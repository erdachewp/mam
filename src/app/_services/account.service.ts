import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

// import { environment } from './environments/environment';
import { Account } from './../_interfaces/account';
const url = "http://localhost: /accounts";
// const baseUrl = `${environment.apiUrl}/accounts`;
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  //constructor() { }
  private accountSubject: BehaviorSubject<Account>;
    public account: Observable<Account>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.accountSubject = new BehaviorSubject<Account>({jwtToken:'',username:'', password: '', firstName:'', lastName:''});
        this.account = this.accountSubject.asObservable();
    }

    public get accountValue(): Account {
        return this.accountSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${url}/authenticate`, { email, password }, { withCredentials: true })
            .pipe(map(account => {
                this.accountSubject.next(account);
                this.startRefreshTokenTimer();
                return account;
            }));
    }

    logout() {
        this.http.post<any>(`${url}/revoke-token`, {}, { withCredentials: true }).subscribe();
        this.stopRefreshTokenTimer();
        this.accountSubject.next({jwtToken:'',username:'', password: '', firstName:'', lastName:''});
        this.router.navigate(['/account/login']);
    }

    refreshToken() {
        return this.http.post<any>(`${url}/refresh-token`, {}, { withCredentials: true })
            .pipe(map((account) => {
                this.accountSubject.next(account);
                this.startRefreshTokenTimer();
                return account;
            }));
    }

    register(account: Account) {
        return this.http.post(`${url}/register`, account);
    }

    verifyEmail(token: string) {
        return this.http.post(`${url}/verify-email`, { token });
    }
    
    forgotPassword(email: string) {
        return this.http.post(`${url}/forgot-password`, { email });
    }
    
    validateResetToken(token: string) {
        return this.http.post(`${url}/validate-reset-token`, { token });
    }
    
    resetPassword(token: string, password: string, confirmPassword: string) {
        return this.http.post(`${url}/reset-password`, { token, password, confirmPassword });
    }

    getAll() {
        return this.http.get<Account[]>(url);
    }

    getById(id: string) {
        return this.http.get<Account>(`${url}/${id}`);
    }
    
    create(params: any) {
        return this.http.post(url, params);
    }
    
    update(_id: string, params: any) {
        return this.http.put(`${url}/${_id}`, params)
            .pipe(map((account: any) => {
                // update the current account if it was updated
                if (account._id === this.accountValue._id) {
                    // publish updated account to subscribers
                    account = { ...this.accountValue, ...account };
                    this.accountSubject.next(account);
                }
                return account;
            }));
    }
    
    delete(_id: string) {
        return this.http.delete(`${url}/${_id}`)
            .pipe(finalize(() => {
                // auto logout if the logged in account was deleted
                if (_id === this.accountValue._id)
                    this.logout();
            }));
    }

    // helper methods

    private refreshTokenTimeout: any;

    private startRefreshTokenTimer() {
        // parse json object from base64 encoded jwt token
        const jwtToken = JSON.parse(atob(this.accountValue.jwtToken.split('.')[1]));

        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}
