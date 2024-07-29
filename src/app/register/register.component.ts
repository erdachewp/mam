import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';

import { AlertService, AuthenticationService, UserService } from '../_services';
import { NgClass, NgIf } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, NgClass, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm !: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) { 
    if (this.authenticationService.currentUserValue){
      this.router.navigate(['/']);
    }
  }
  get f(){ return this.registerForm.controls; }
  onSubmit(){
    this.submitted = true;
    if(this.registerForm.invalid){ return; }
    this.loading = true;
    this.userService.register(this.registerForm.value)
    .pipe(first()).subscribe(
      (data: any) =>{
        this.alertService.success('Congratulations, '+
          `${this.f['firstName'].value}` +', You are registered, successfully.');
          this.router.navigate(['/login']);
        },
        (error: any) =>{
          this.alertService.error(error);
        },
        () => {}      
    );
  }
}
