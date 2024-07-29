import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { Contact } from '../../interfaces/contact';
import { AddressComponent } from "../address/address.component";
@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [
    FormsModule,
    AddressComponent
],
  templateUrl: './add-person.component.html',
  styleUrl: './add-person.component.css'
})
export class AddPersonComponent {
  personArray: any[] = [];
  currentPersontID = "";
  lastName: string = "";
  firstName:string = "";
  address:string = "";
  phone:string = "";
  contacts?: Contact[] = [];
  constructor(private personService: PersonService){}

  save(firstName: any) {
    if(this.currentPersontID == '')
    {
        this.register(); 
        alert(firstName+" Student Registered Successfully");   
        console.log(firstName +" is added to Students Collection.")    
    }
      else
      {
      // this.UpdateRecords();
       console.log(firstName +" is Updated in Collection.")    

      }       
  }
          // "Z","Will","Mark"
  register()
    {
      let bodyData = 
      {
        "firstName" : this.firstName,
        "lastName": this.lastName,
        "address" : this.address,
        "phone" : this.phone, 
        "contacts": this.contacts
      };
      this.personService.add(bodyData).subscribe(
        ((resultData: any)=>
          {
            console.log("Something is happening!!!")
            console.log(resultData);
            console.log(bodyData);
            alert("Student Registered Successfully")
            //this.getAllEmployee();
            this.firstName = '';
            this.lastName = '';
            this.address = '';
            this.phone  = '';
            // this.getAllStudent();
          }
        ),
        (error)=> {  console.log("something is wrong!!!")},
        () =>    { console.log("Process is complete!")}
      );
    }
}
