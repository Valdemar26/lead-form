import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  leadForm: FormGroup;
  emails: FormArray;
  phones: FormArray;
  customs: FormArray;
  value: string;

  minSize: any = [
    {value: '50 m'},
    {value: '60 m'},
    {value: '70 m'},
    {value: '80 m'}
  ];

  maxSize: any = [
    {value: '90 m'},
    {value: '100 m'},
    {value: '110 m'},
    {value: '120 m'}
  ];

  budgetFrom: any = [
    {value: '50 000$'},
    {value: '60 000$'},
    {value: '75 000$'},
  ];

  budgetTo: any = [
    {value: '80 000$'},
    {value: '90 000$'},
    {value: '100 000$'},
  ];

  property: any = [
    {value: 'single'},
    {value: 'double'},
  ];

  apartmentType: any = [
    {value: 'Single family'},
    {value: 'Condo'},
    {value: 'Duplex'},
    {value: 'Townhouse'},
    {value: 'Apartment'},
  ];

  city: any = [
    {value: 'New York'},
    {value: 'Miami'},
    {value: 'Los Angeles'},
  ];

  year: any = [
    {value: 'to 2000'},
    {value: 'from 2000'},
  ];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  features: any = [
    {name: 'Feature1'},
    {name: 'Feature2'},
    {name: 'Feature3'},
  ];

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.leadForm = this.formBuilder.group({
      name: '',
      surname: '',
      address: '',
      emails: this.formBuilder.array([ this.formBuilder.control('') ]),
      phones: this.formBuilder.array([ this.formBuilder.control('') ]),
      status: '',
      buyer: '',
      source: '',
      customs: this.formBuilder.array([ this.formBuilder.control('') ]),
      minsize: '',
      maxsize: '',
      from: '',
      to: '',
      propertyType: '',
      apartmentType: '',
      city: '',
      yearBuilt: ''
    });
  }

  addEmailItem(): void {
    this.emails = this.leadForm.get('emails') as FormArray;
    this.emails.push(this.formBuilder.control(''));
  }

  addPhoneItem(): void {
    this.phones = this.leadForm.get('phones') as FormArray;
    this.phones.push(this.formBuilder.control(''));
  }

  addCustomItem(): void {
    this.customs = this.leadForm.get('custom') as FormArray;
    this.customs.push(this.formBuilder.control(''));
  }

  submitForm() {
    console.log(this.leadForm.value);
  }

  addChip(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our feature
    if ((value || '').trim()) {
      this.features.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeChip(feature: any): void {
    const index = this.features.indexOf(feature);

    if (index >= 0) {
      this.features.splice(index, 1);
    }
  }

}
