import { Component } from '@angular/core';
import { Person } from '../../interfaces/person';
import { PersonService } from '../../services/person.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { first } from 'rxjs';
@Component({
  selector: 'app-update-person',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './update-person.component.html',
  styleUrl: './update-person.component.css'
})
export class UpdatePersonComponent {
  alert: boolean  = false;
  updatePersonForm: FormGroup = new FormGroup({
    // firstName: new FormControl(),
    // lastName: new FormControl(),
    // address: new FormControl(),
    // phone: new FormControl(),
  });
  constructor(
    private personService: PersonService,
    private router: ActivatedRoute
  ){}
  ngOnInit(){
    this.personService.getCurrentPerson(this.router.snapshot.params['_id']).pipe(first()).subscribe({
      next: (result: Person) =>{
      this.updatePersonForm = new FormGroup({
        firstName: new FormControl(result.firstName),
        lastName: new FormControl(result.lastName),
        address: new FormControl(result.address),
        phone: new FormControl(result.phone),
      });
      },
      error: (err)=> {
        console.log("Error: ", err);
      }
    }

    );
  }
  update(){
    this.personService.update(this.router.snapshot.params['_id'], this.updatePersonForm.value).pipe(first())
      .subscribe({
         next: (result?: any) => { this.alert = true
          console.log("Person\'s file updated");
        },       
        error: ()=>{
          console.log("Error while updating Person file")
        },
        complete: ()=>{}
      })
    }
// ( (result?: any) => { this.alert = true
//           console.log("Person\'s file updated");
//         } ),       
//         (err)=>{
//           console.log("Error while updating Person file")
//         },
//          ()=>{}
//       );
  
  closeAlert(){
    this.alert = false;
  }
}
