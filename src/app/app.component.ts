import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

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

  foods: any = [
    {value: 'steak-0'},
    {value: 'pizza-1'},
    {value: 'tacos-2'}
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
      customs: this.formBuilder.array([ this.formBuilder.control('') ])
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

}
