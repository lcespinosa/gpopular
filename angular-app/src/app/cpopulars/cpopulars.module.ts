import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpopularsRoutingModule } from './cpopulars-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CpopularListComponent } from './cpopular-list/cpopular-list.component';

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
