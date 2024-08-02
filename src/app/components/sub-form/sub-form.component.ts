import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray,FormGroup,ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import  { Hobby } from '../../interfaces/hobby';
import { SubForm } from '../../interfaces/subForm';
import { HobbyComponent } from '../hobby/hobby.component';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-sub-form',
  standalone: true,
  imports: [ReactiveFormsModule, HobbyComponent, NgFor, NgIf],
  templateUrl: './sub-form.component.html',
  styleUrl: './sub-form.component.css'
})
export class SubFormComponent {
  constructor(private fb: FormBuilder){}
  @Output('newSubForm') submitFormObjectToParent: EventEmitter<SubForm> = new EventEmitter<SubForm>();
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    age:['', [Validators.required, Validators.min(1)]],
    hobbies: this.fb.array([], this.minFormArrayLength(2))
  });
  get hobbies(): Hobby[]{
    return this.form.get('hobbies')?.value;
  }

  addNewHobby(hobby: Hobby){
    const control = this.form.get('hobbies') as FormArray;
    control.push(this.fb.group(hobby));
  }
  emptyHobbies(){
    const control = this.form.get('hobbies') as FormArray;
    let totalItems = control.value.length;
    while(totalItems > 0){
      totalItems--;
      control.removeAt(totalItems);
    }
  }
  minFormArrayLength(min: number) {
    return (c: AbstractControl): {[key: string]: any} => {
      if (c.value.length >= min) {return [];}
      return { 'minLengthArray': {valid: false }};
    }
  }
  get thereIsAtLeastOneItemInHobbiesArray(): boolean{
    return (this.form.get('hobbies') as FormArray).length > 0; 
  }
  submit(){
    this.submitFormObjectToParent.emit(this.form.value);
    console.log(this.form.value);
    this.emptyHobbies();
    this.form.reset();
  }
}
