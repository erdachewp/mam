import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Person } from '../../interfaces/person';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-person-details',
  standalone: true,
  imports: [NgIf, RouterLink, NgFor],
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.css'
})
export class PersonDetailsComponent {
  @Input() person: Person = {}
}
