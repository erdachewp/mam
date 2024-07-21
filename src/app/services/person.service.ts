import { Injectable } from '@angular/core';
import { HttpClient, provideHttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Person } from '../interfaces/person';
const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class PersonService {
  // localPeopleUrl = "http://localhost:4500/people";
  private peopleUrl = "http://localhost:8200/peoples";
  private addPersonUrl = "http://localhost:8200/person/create";
  constructor(private http: HttpClient) { }
  getPeople(): Observable<Person[]>{
    return this.http.get<Person[]>(this.peopleUrl).pipe(      
      catchError(
        this.handlerError<Person[]>('getPeople', []),)        
    );
  }
  add(person: any): Observable<Person>{
    return this.http.post<Person>(this.addPersonUrl, person, options);
  }
  update(person: any, id: string){
  }
  delete(){}
  private  handlerError <T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
    //  console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  log(error: string){}
}
