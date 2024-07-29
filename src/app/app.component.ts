import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { PeopleComponent } from './components/people/people.component';
import { Router } from '@angular/router';
import { User } from './_interfaces';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './_services';
import { AlertComponent } from './_components/alert/alert.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    PeopleComponent, 
    HttpClientModule,
    AlertComponent 
  ], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentUser !: User;
  title = 'Man';
  today = new Date();
  constructor(
    private router: Router,
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ){
    // this.authenticationService.currentUser.subscribe(
    //   x => {
    //     this.currentUser = x;
    //   }
    // );
  }
  ngOnInit(){
    this.getCors()
  }
  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  getCors(){
    this.http.get('http://localhost:6000/x-cors').subscribe(
      data => { console.log(data)}
    )
  }
}
    