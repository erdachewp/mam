import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { PeopleComponent } from './components/people/people.component';
import { HobbyComponent } from './components/hobby/hobby.component';
import { Router } from '@angular/router';
import { User } from './_interfaces';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './_services';
import { AlertComponent } from './_components/alert/alert.component';
import { FormArray, FormBuilder } from '@angular/forms';
import { SubForm } from './interfaces/subForm';
import { Hobby } from './interfaces/hobby';
import { SubFormComponent } from "./components/sub-form/sub-form.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PeopleComponent,
    HttpClientModule,
    AlertComponent,
    HobbyComponent,
    SubFormComponent
], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentUser !: User;
  title = 'Man';
  today = new Date();
  buttonHasBeenClicked: boolean = false;
  form = new FormArray([]);
  constructor(
    private router: Router,
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder
  ){
    // this.authenticationService.currentUser.subscribe(
    //   x => {
    //     this.currentUser = x;
    //   }
    // );
  }
  ngOnInit(){
    this.getCors();
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
  addSubForm(subForm: SubForm){
    // const control = this.form.get('hobbies');
    // let totalItems = control;
    const group = `${this.fb.group(subForm)}`
    this.form.push(group as never);
    console.log(subForm.hobbies[0].name);
    console.log(subForm);
  }
}
    //this.fb.group(subForm)
          // name: String, age: 0, hobbies: {}