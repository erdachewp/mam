import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonService } from '../../services/person.service';
@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-person.component.html',
  styleUrl: './add-person.component.css'
})
export class AddPersonComponent {
  personArray: any[] = [];
  currentPersontID = "";
  name:string = "";
  address:string = "";
  phone:string = "";

  constructor(private personService: PersonService){}

  save(name: any) {
    if(this.currentPersontID == '')
    {
        this.register(); 
        alert(name+" Student Registered Successfully");   
        console.log(name +" is added to Students Collection.")    
    }
      else
      {
      // this.UpdateRecords();
       console.log(name +" is Updated in Collection.")    

      }       
  }
          // "Z","Will","Mark"
  register()
    {
      let bodyData = 
      {
        "name" : this.name,
        "address" : this.address,
        "phone" : this.phone, 
      };
      this.personService.add(bodyData).subscribe(
        ((resultData: any)=>
          {
            console.log("Something is happening!!!")
            console.log(resultData);
            console.log(bodyData);
            alert("Student Registered Successfully")
            //this.getAllEmployee();
            this.name = '';
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
