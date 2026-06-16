import { Component, inject, } from '@angular/core';
import { Person } from '../../interfaces/person';
import { PersonService } from '../../services/person.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  updatePersonForm: FormGroup =  new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    address: new FormControl(),
    phone: new FormControl()

  }); 
  fBuild = inject(FormBuilder) 
  personData: Person = {
    firstName: '',
    lastName: '',
    address: '',
    phone: ''
  }
  // = new FormGroup({
  //   firstName: new FormControl(),
  //   lastName: new FormControl(),
  //   address: new FormControl(),
  //   phone: new FormControl(),
  // });
  constructor(
    private personService: PersonService,
    private route: ActivatedRoute
  ){}
  ngOnInit(){

   this.personService.getCurrentPerson(this.route.snapshot.params['_id']).pipe(first()).subscribe({
      next: (person) =>{
        this.updatePersonForm = new FormGroup({
          firstName: new FormControl(person.firstName),
          lastName: new FormControl(person.lastName),
          address: new FormControl(person.address),
          phone: new FormControl(person.phone),
        });
      },
      error: (err)=> {
        console.log("Error: ", err);
      }
    }
    );


    // this.getPerson();
    // this.updatePersonForm = new FormGroup({
    //   firstName: new FormControl (),
    //   lastName:  new FormControl ([this.personData.lastName]),
    //   address:   new FormControl ([this.personData.address]),
    //   phone:     new FormControl ([this.personData.phone]),
    // });   
  }  
  getPerson(){
//    this.personService.getCurrentPerson(this.route.snapshot.params['_id']).pipe(first()).subscribe({
//       next: (person) =>{
// //    this.personData = person;
//         this.updatePersonForm = new FormGroup({
//           firstName: new FormControl(person.firstName),
//           lastName: new FormControl(person.lastName),
//           address: new FormControl(person.address),
//           phone: new FormControl(person.phone),
//         });
//       },
//       error: (err)=> {
//         console.log("Error: ", err);
//       }
//     }
//     );
  }
  update(){
    this.personService.update(this.route.snapshot.params['_id'], this.updatePersonForm.value).pipe(first())
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
