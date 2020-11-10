import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsRoutingModule } from './results-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { ResultListComponent } from './result-list/result-list.component';

@NgModule({
  imports: [
    CommonModule,
    ResultsRoutingModule,
    SharedModule
  ],
  declarations: [
    ResultListComponent,
  ],
  entryComponents: [
  ]
})
export class ResultsModule { }
