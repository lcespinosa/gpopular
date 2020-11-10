import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpopularsRoutingModule } from './cpopulars-routing.module';
import { CpopularListComponent } from './cpopular-list/cpopular-list.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CpopularsRoutingModule,
    SharedModule
  ],
  declarations: [
    CpopularListComponent,
  ],
  entryComponents: [
  ]
})
export class CpopularsModule { }
