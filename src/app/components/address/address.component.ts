import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { Address } from '../../interfaces/address';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [
    ReactiveFormsModule, NgFor, NgIf
  ],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {
  @Output('newAddress') addAddress: EventEmitter<Address> = new EventEmitter<Address>();
//  addressAddForm!: FormGroup;
  constructor(private fb: FormBuilder){}
  addressAddForm: FormGroup = this.fb.group({
    street:[],
    city:[],
    state:[],
    zip:[]
  });
  onSubmit(addressAddForm: FormGroup){
    console.log(
      "Address:\n "+this.addressAddForm.value.street+
      "\n "+this.addressAddForm.value.city+
      ",  "+this.addressAddForm.value.state+
      "Zip: "+this.addressAddForm.value.zip
    );
    this.addAddress.emit(this.addressAddForm.value);
    this.addressAddForm.reset();
  }
}
