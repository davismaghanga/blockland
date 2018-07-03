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
import { LandService } from './Land.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-land',
  templateUrl: './Land.component.html',
  styleUrls: ['./Land.component.css'],
  providers: [LandService]
})
export class LandComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  landId = new FormControl('', Validators.required);
  landRefNo = new FormControl('', Validators.required);
  location = new FormControl('', Validators.required);
  size = new FormControl('', Validators.required);
  ownerId = new FormControl('', Validators.required);

  constructor(private serviceLand: LandService, fb: FormBuilder) {
    this.myForm = fb.group({
      landId: this.landId,
      landRefNo: this.landRefNo,
      location: this.location,
      size: this.size,
      ownerId: this.ownerId
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceLand.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'com.neverest.co.ke.Land',
      'landId': this.landId.value,
      'landRefNo': this.landRefNo.value,
      'location': this.location.value,
      'size': this.size.value,
      'ownerId': this.ownerId.value
    };

    this.myForm.setValue({
      'landId': null,
      'landRefNo': null,
      'location': null,
      'size': null,
      'ownerId': null
    });

    return this.serviceLand.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'landId': null,
        'landRefNo': null,
        'location': null,
        'size': null,
        'ownerId': null
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


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'com.neverest.co.ke.Land',
      'landRefNo': this.landRefNo.value,
      'location': this.location.value,
      'size': this.size.value,
      'ownerId': this.ownerId.value
    };

    return this.serviceLand.updateAsset(form.get('landId').value, this.asset)
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


  deleteAsset(): Promise<any> {

    return this.serviceLand.deleteAsset(this.currentId)
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

    return this.serviceLand.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'landId': null,
        'landRefNo': null,
        'location': null,
        'size': null,
        'ownerId': null
      };

      if (result.landId) {
        formObject.landId = result.landId;
      } else {
        formObject.landId = null;
      }

      if (result.landRefNo) {
        formObject.landRefNo = result.landRefNo;
      } else {
        formObject.landRefNo = null;
      }

      if (result.location) {
        formObject.location = result.location;
      } else {
        formObject.location = null;
      }

      if (result.size) {
        formObject.size = result.size;
      } else {
        formObject.size = null;
      }

      if (result.ownerId) {
        formObject.ownerId = result.ownerId;
      } else {
        formObject.ownerId = null;
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
      'landId': null,
      'landRefNo': null,
      'location': null,
      'size': null,
      'ownerId': null
      });
  }

}
