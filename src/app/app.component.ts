import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {fromEvent} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  leadForm: FormGroup;
  emails: FormArray;
  phones: FormArray;
  customs: FormArray;
  minsize: FormArray;
  beds: FormArray;
  featuresList: FormArray;
  value: string;
  isLoading = false;

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
  features: any = [];

  chips: any = [
    {name: 'Feature1'},
    {name: 'Feature2'},
    {name: 'Feature3'},
    {name: 'Long Title feature'},
    {name: 'Feature1'},
    {name: 'Feature2'},
    {name: 'Feature3'},
    {name: 'Feature1'},
    {name: 'Feature2'},
    {name: 'Feature3'},
    {name: 'Long Title feature'},
    {name: 'Feature1'},
    {name: 'Feature2'},
    {name: 'Feature3'}
  ];

  buttons = [
    {
      name: '1',
      check: false,
    },
    {
      name: '2',
      check: false,
    },
    {
      name: '3',
      check: false,
    },
    {
      name: '4+',
      check: false,
    },
  ];

  selectedButtons: any[] = [];
  submitted = false;

  @ViewChild('buttonsRef', {static: true}) buttonsRef: ElementRef;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  /**
   * use 'FormBuilder service' to large forms, or 'FormGroup' for small forms
   *
   * FormGroup groups AbstractControl objects in an object.
   * FormArray groups AbstractControl in an array
   */

  initForm() {
    this.leadForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required]],
      emails: this.formBuilder.array([ this.formBuilder.control('', [Validators.required, Validators.email]) ]),
      phones: this.formBuilder.array([ this.formBuilder.control('') ]),
      status: '',
      buyer: '',
      source: '',
      customs: this.formBuilder.array([ this.formBuilder.control('') ]),
      minsize: this.formBuilder.array([]),
      maxsize: this.formBuilder.array([]),
      budgetfrom: '',
      to: '',
      propertyType: '',
      apartmentType: '',
      city: '',
      yearBuilt: '',
      picker: '',
      features: this.formBuilder.array([]),
      beds: this.formBuilder.array([]),
    });
  }

  // convenience getter for easy access to form fields
  get form() { return this.leadForm.controls; }

  selectAll() {
    this.selectedButtons.length = 0;
    console.log(this.form);
  }

  selectBeds(button): any {
    if (!this.selectedButtons.includes(button.name) && this.selectedButtons.length <= 1 )  {
      this.selectedButtons.push(button.name);
    } else if ( this.selectedButtons.length === 2 && !this.selectedButtons.includes(button.name) ) {
      this.selectedButtons.pop();
      this.selectedButtons.push(button.name);
    } else {
      this.selectedButtons = this.selectedButtons.filter((item) => item !== button.name);
    }
  }

  addEmailItem(): void {
    this.emails = this.leadForm.get('emails') as FormArray; // 'this.leadForm.controls.emails' is bad code-style, use '.get' method instead
    this.emails.push(this.formBuilder.control('', [Validators.required, Validators.email]));
  }

  addFeatures(value): void {
    this.featuresList = this.leadForm.get('features') as FormArray;
    this.featuresList.push(this.formBuilder.control(value));
  }

  addPhoneItem(): void {
    this.phones = this.leadForm.get('phones') as FormArray;
    this.phones.push(this.formBuilder.control(''));
  }

  addCustomItem(): void {
    this.customs = this.leadForm.get('custom') as FormArray;
    this.customs.push(this.formBuilder.control(''));
  }

  addMinSizeItem(data): void {
    console.log('Data: ');
    this.minsize = this.leadForm.get('minsize') as FormArray;
    this.minsize.push(this.formBuilder.control(data));
  }

  initBedsControl(): void {
    this.buttons.forEach(button => {
      this.beds = this.leadForm.get('beds') as FormArray;
      this.beds.push(this.formBuilder.control(button.name));
    });
  }

  ngAfterViewInit(): void {
    this.initBedsControl();
  }

  // addFeaturesItem(): void {
  //   this.features = this.leadForm.get('features') as FormArray;
  //   this.features.push(this.formBuilder.control(''));
  // }

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

    this.addFeatures(value);
  }

  removeChip(feature: any): void {
    const index = this.features.indexOf(feature);

    if (index >= 0) {
      this.features.splice(index, 1);
    }
  }

  submitForm() {

    this.submitted = true;
    window.scrollTo({top: 0, behavior: 'smooth'});
    if (this.selectedButtons.length) {
      this.leadForm.value.beds = this.selectedButtons.sort().reduce((acc, item, index, arr) => {
        acc.min = arr[0];
        acc.max = arr[1];
        return acc;
      }, {});
    } else {
       this.leadForm.value.beds = { beds: 'All'};
    }

    console.log('LeadForm: ', this.leadForm.value);
    this.isLoading = true;
    this.leadForm.reset();

    setTimeout(() => {
      this.isLoading = false;
    }, 3500);
  }

}
