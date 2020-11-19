import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandsRoutingModule } from './demands-routing.module';
import { DemandListComponent } from './demand-list/demand-list.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DemandsRoutingModule,
    SharedModule
  ],
  declarations: [
    DemandListComponent
  ],
  entryComponents: [
  ]
})
export class DemandsModule { }
