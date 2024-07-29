import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';
import { User } from '../_interfaces';
const url = "mongodb://localhost:27017/man_mandb"
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject!: BehaviorSubject<User>;
  currentUser!: Observable<User>;
  constructor(private http: HttpClient) {
    // this.currentUserSubject = {}
        // new BehaviorSubject<User>(`${localStorage.getItem('currentUser')}`);
    localStorage.getItem("")
//    this.currentUser = this.currentUserSubject.asObservable();
   }
   public get currentUserValue(): User{
    return this.currentUserSubject.value;
    }
    login(username: string, password: string){
        return this.http.post<any>(`/users/authenticate`, { username, password}).pipe(
            map(
                user => {
                    if (user && user.token){
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        this.currentUserSubject.next(user);
                    }

                    return user;
                }
            )
        )
    }
    logout(){
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next({
            _id:"",
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            token: ''
        })
    }
}
