import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup,FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Hobby } from '../../interfaces/hobby';
@Component({
  selector: 'app-hobby',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './hobby.component.html',
  styleUrl: './hobby.component.css'
})
export class HobbyComponent {
  @Output('newHobby') addHobby: EventEmitter<Hobby> = 
    new EventEmitter<Hobby>();
  constructor(private fb: FormBuilder){}
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    frequency: ['', Validators.required]
  })
  submit(){
    console.log(this.form.value);
    this.addHobby.emit(this.form.value);
    this.form.reset();
}
}
