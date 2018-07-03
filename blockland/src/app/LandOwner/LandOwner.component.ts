/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LandOwnerService } from './LandOwner.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-landowner',
  templateUrl: './LandOwner.component.html',
  styleUrls: ['./LandOwner.component.css'],
  providers: [LandOwnerService]
})
export class LandOwnerComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  ownerId = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  IdNumber = new FormControl('', Validators.required);
  PhoneNumber = new FormControl('', Validators.required);


  constructor(private serviceLandOwner: LandOwnerService, fb: FormBuilder) {
    this.myForm = fb.group({
      ownerId: this.ownerId,
      firstName: this.firstName,
      lastName: this.lastName,
      IdNumber: this.IdNumber,
      PhoneNumber: this.PhoneNumber
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceLandOwner.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'com.neverest.co.ke.LandOwner',
      'ownerId': this.ownerId.value,
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'IdNumber': this.IdNumber.value,
      'PhoneNumber': this.PhoneNumber.value
    };

    this.myForm.setValue({
      'ownerId': null,
      'firstName': null,
      'lastName': null,
      'IdNumber': null,
      'PhoneNumber': null
    });

    return this.serviceLandOwner.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'ownerId': null,
        'firstName': null,
        'lastName': null,
        'IdNumber': null,
        'PhoneNumber': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'com.neverest.co.ke.LandOwner',
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'IdNumber': this.IdNumber.value,
      'PhoneNumber': this.PhoneNumber.value
    };

    return this.serviceLandOwner.updateParticipant(form.get('ownerId').value, this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceLandOwner.deleteParticipant(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceLandOwner.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'ownerId': null,
        'firstName': null,
        'lastName': null,
        'IdNumber': null,
        'PhoneNumber': null
      };

      if (result.ownerId) {
        formObject.ownerId = result.ownerId;
      } else {
        formObject.ownerId = null;
      }

      if (result.firstName) {
        formObject.firstName = result.firstName;
      } else {
        formObject.firstName = null;
      }

      if (result.lastName) {
        formObject.lastName = result.lastName;
      } else {
        formObject.lastName = null;
      }

      if (result.IdNumber) {
        formObject.IdNumber = result.IdNumber;
      } else {
        formObject.IdNumber = null;
      }

      if (result.PhoneNumber) {
        formObject.PhoneNumber = result.PhoneNumber;
      } else {
        formObject.PhoneNumber = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });

  }

  resetForm(): void {
    this.myForm.setValue({
      'ownerId': null,
      'firstName': null,
      'lastName': null,
      'IdNumber': null,
      'PhoneNumber': null
    });
  }
}
