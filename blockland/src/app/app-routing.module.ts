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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { LandComponent } from './Land/Land.component';
import { AccountComponent } from './Account/Account.component';

import { LandOwnerComponent } from './LandOwner/LandOwner.component';
import { LegalBodyComponent } from './LegalBody/LegalBody.component';

import { LandTransferComponent } from './LandTransfer/LandTransfer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Land', component: LandComponent },
  { path: 'Account', component: AccountComponent },
  { path: 'LandOwner', component: LandOwnerComponent },
  { path: 'LegalBody', component: LegalBodyComponent },
  { path: 'LandTransfer', component: LandTransferComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
