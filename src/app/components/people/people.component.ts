import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { AddPersonComponent } from '../add-person/add-person.component';
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
    AddPersonComponent   
   ],
  templateUrl: './people.component.html',
  styleUrl: './people.component.css'
})
export class PeopleComponent {
  poeple_list: string[] = [
    "Adam","Bob", "Carlos"
  ];
    peoples: any[] = [];
  constructor(private personService: PersonService){}
  ngOnInit(){
    this.getPeople();
  }
  getPeople(): void{
    this.personService.getPeople().subscribe(
      (peoples: any[]) => this.peoples = peoples
    );
  }
}
