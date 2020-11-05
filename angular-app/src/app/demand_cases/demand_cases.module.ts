import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandCasesRoutingModule } from './demand_cases-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DemandCaseListComponent } from './demand-case-list/demand-case-list.component';

@NgModule({
  imports: [
    CommonModule,
    DemandCasesRoutingModule,
    SharedModule
  ],
  declarations: [
    DemandCaseListComponent,
  ],
  entryComponents: [
  ]
})
export class DemandCasesModule { }
