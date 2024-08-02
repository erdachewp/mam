import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, FormGroup, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { Contact } from '../../interfaces/contact';
import { AddressComponent } from "../address/address.component";
import { Person } from '../../interfaces/person';
import { Address } from '../../interfaces/address';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [
    FormsModule,
    AddressComponent,
    ReactiveFormsModule, NgFor, NgIf
],
  templateUrl: './add-person.component.html',
  styleUrl: './add-person.component.css'
})
export class AddPersonComponent {
  @Output('newPerson') sendPersonToBeAdded: EventEmitter<Person> = new EventEmitter<Person>();
  personArray: any[] = [];
  // personform: FormGroup = new FormGroup({
  //   firstName: new FormControl(),
  //   lastName: new FormControl(),
  //   phone: new FormControl(),
  //   contacts: new FormControl(),
  //   address: new FormControl(),
  //   addresses: new FormGroup({
  //     street: new FormControl(),
  //     city: new FormControl(),
  //     state: new FormControl(),
  //     zip: new FormControl(),
  //   }),
  // })
  currentPersontID = "";
  lastName: string = "";
  firstName:string = "";
  address:string = "";
  // addresses:string = this.personForm.controls.addresses;
  // addresses: Address[]= [];
  phone:string = "";
  contacts?: Contact[] = [];
  personForm: FormGroup = this.fb.group({
    firstName:[new FormControl()],
    lastName: [new FormControl()],
    phone: [new FormControl()],
    address: [new FormControl()],
    addresses: this.fb.array([], this.minFormArrayLength(2))
  });
  
  constructor(
    private personService: PersonService,
    private fb: FormBuilder
  ){}
  get addresses(): Address[]{
    return this.personForm.get('addresses')?.value;
  }
  addnewAddress(address: Address){
    const control = this.personForm.get('addresses') as FormArray;
    //this.street = address.street;
    control.push(this.fb.group(address));
  }
  emptyAddresses(){
    const control = this.personForm.get("addresses") as FormArray
    let allAddresses = control.value.length;
    while(allAddresses > 0){
      allAddresses--;
      control.removeAt(allAddresses);
    }
  }
  minFormArrayLength(min: number) {
    return (c: AbstractControl): {[key: string]: any} => {
      if (c.value.length >= min) {return [];}
      return { 'minLengthArray': {valid: false }};
    }
  }
  get thereIsAtLeastOneItemInAddressesArray(): boolean{
    return (this.personForm.get('addresses') as FormArray).length > 0; 
  }
  save(firstName: any) {
    if(this.currentPersontID == '')
    {
        this.register(); 
        alert(firstName+" Student Registered Successfully");   
        console.log(firstName +" is added to Students Collection.")    
    } else{
      // this.UpdateRecords();
       console.log(firstName +" is Updated in Collection.")    
      }       
  }

  register()
    {
      let bodyData = 
      {
        "firstName" : this.firstName,
        "lastName": this.lastName,
        "address" : this.address,
        "phone" : this.phone, 
        "contacts": this.contacts,  
            
      };

      this.personService.add(bodyData).subscribe(
        ((resultData: any)=>
          {
            console.log("Something is happening!!!")
            console.log(resultData);
            // console.log(bodyData.addresses);
            console.log(bodyData);

            alert(resultData+ "\n Student Registered Successfully")
            //this.getAllEmployee();
            // this.firstName = '';
            // this.lastName = '';
            // this.address = '';
            // this.phone  = '';
          }
        ),
        (error)=> {  console.log("something is wrong!!!")},
        () =>    { console.log("Process is complete!")}
      );
    }
}
