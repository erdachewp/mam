import { Component, Input } from '@angular/core';
import { Person } from '../../interfaces/person';
import { NgIf } from "@angular/common";
import { PersonDetailsComponent } from '../person-details/person-details.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-people-item',
  standalone: true,
  imports: [NgIf, PersonDetailsComponent, RouterLink],
  templateUrl: './people-item.component.html',
  styleUrl: './people-item.component.css'
})
export class PeopleItemComponent {
  @Input() person: Person = {};
  selectedPerson!: Person ;
  onSelect(person: any){
    this.selectedPerson = person;
  }
}
