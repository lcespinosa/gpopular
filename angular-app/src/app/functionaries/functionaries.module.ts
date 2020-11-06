import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunctionariesRoutingModule } from './functionaries-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FunctionaryListComponent } from './functionary-list/functionary-list.component';
import {NgSelect2Module} from 'ng-select2';

@NgModule({
  imports: [
    CommonModule,
    FunctionariesRoutingModule,
    SharedModule,
    NgSelect2Module
  ],
  declarations: [
    FunctionaryListComponent,
  ],
  entryComponents: [
  ]
})
export class FunctionariesModule { }
