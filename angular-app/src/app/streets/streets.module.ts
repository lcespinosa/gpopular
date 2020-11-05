import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreetsRoutingModule } from './streets-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StreetListComponent } from './street-list/street-list.component';
import {NgSelect2Module} from 'ng-select2';

@NgModule({
  imports: [
    CommonModule,
    StreetsRoutingModule,
    SharedModule,
    NgSelect2Module
  ],
  declarations: [
    StreetListComponent,
  ],
  entryComponents: [
  ]
})
export class StreetsModule { }
