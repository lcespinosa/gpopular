import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ManagementRoutingModule } from './management-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ManagementRoutingModule,
    SharedModule,
  ],
  declarations: [],
  entryComponents: [
  ]
})
export class ManagementModule { }
