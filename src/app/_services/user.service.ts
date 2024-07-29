import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { User } from '../_interfaces';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  getAll(){
    return this.http.get<User[]>(`/users`)
  }
  register(user: User){
    return this.http.post(`/users/register`, user);
  }
  delete(_id: string){
    return this.http.delete(`/users/${_id}`);
  }
}
