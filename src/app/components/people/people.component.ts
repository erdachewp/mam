import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './people.component.html',
  styleUrl: './people.component.css'
})
export class PeopleComponent {
  poeple_list: string[] = [
    "Adam","Bob", "Carlos"
  ];
    people: string[] = [];
  constructor(private personService: PersonService){}
  ngOnInit(){
    this.getPeople();
  }
  getPeople(): void{
    this.personService.getPeople().subscribe(
(      (people: any) => this.people = people)
    );
  }
}
