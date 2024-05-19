import { Injectable } from '@angular/core';
import { HttpClient, provideHttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private peopleUrl = "http://localhost:3500/people";
  constructor(private http: HttpClient) { }
  getPeople(): Observable<string[]>{
    return this.http.get<string[]>(this.peopleUrl).pipe(      
      catchError(
        this.handlerError<string[]>('getPeople', []),)        
    );
  }
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
