import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_helpers/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { PeopleItemComponent } from './components/people-item/people-item.component';
import { UpdatePersonComponent } from './components/update-person/update-person.component';
import { AddPersonComponent } from './components/add-person/add-person.component';
export const routes: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '', component: PeopleItemComponent }, 
    { path: 'add', component: AddPersonComponent },
    { path: 'details', component: PersonDetailsComponent },
    { path: 'update/: id', component: UpdatePersonComponent},
   
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '' },
];
