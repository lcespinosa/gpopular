import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReasonTypesRoutingModule } from './reason_types-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { ReasonTypeListComponent } from './reason_type-list/reason_type-list.component';

@NgModule({
  imports: [
    CommonModule,
    ReasonTypesRoutingModule,
    SharedModule
  ],
  declarations: [
    ReasonTypeListComponent,
  ],
  entryComponents: [
  ]
})
export class ReasonTypesModule { }
