import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { AddPersonComponent } from '../add-person/add-person.component';
import { PeopleItemComponent } from '../people-item/people-item.component';
import { PersonDetailsComponent } from '../person-details/person-details.component';
// import {ScrollingModule} from '@angular/cdk/scrolling';
//import {Scrolling} from '@angular/cdk/scrollingModule';
// import { MatCardModule } from '@angular/material/card';
// import { NgScrollbarModule } from 'ngx-scrollbar';
// import{ jqxScrollBarComponent } from 'jqwidgets-ng/jqxscrollbar'; 
// import { NgScrollbarCdkVirtualScroll } from 'ngx-scrollbar/cdk';
@Component({
  selector: 'app-people',
  standalone: true,
  imports: [
    CommonModule,
    // AddPersonComponent,
    PeopleItemComponent,
    // PersonDetailsComponent   
   ],
  templateUrl: './people.component.html',
  styleUrl: './people.component.css'
})
export class PeopleComponent {
  poeple_list: string[] = [
    "Adam","Bob", "Carlos"
  ];
  orderedPeople: any[] = [];
  people: any[] = [];
  constructor(private personService: PersonService){}
  ngOnInit(){
    this.getPeople();
  }
  getPeople(): void{
    this.personService.getPeople().subscribe({
      next : (people) => this.people = people,
      error: ()=> {},
    }

      // .sort(
      //   (a, b) => a.name.localCompare(b.name) ||
      //   a.firstName.localCompare(b.firstName) || 
      //   a.name.localCompare(b.firstName) || 
      //   a.firstName.localCompare(b.name) )
    );
  }
}
