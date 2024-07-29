import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators'
import { User } from './../_interfaces';
import { UserService, AuthenticationService } from '../_services';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentUser !: User ;//= {}//{_id:"",username: '', password: '', firstName: '',lastName:'',token: ''}
  currentUserSubscription: Subscription;
  users: User[] = [];
  constructor( 
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
        user => {
          this.currentUser = user;
        }
      );
     }

  ngOnInit(): void {
    this.loadAllUsers();
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
}

deleteUser(_id: string) {
    this.userService.delete(_id).pipe(first()).subscribe(() => {
        this.loadAllUsers()
    });
}

private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
        this.users = users;
    });
}
}
