import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunctionariesRoutingModule } from './functionaries-routing.module';
import { FunctionaryListComponent } from './functionary-list/functionary-list.component';
import {SharedModule} from '../../../shared/shared.module';
import {NzSelectModule} from 'ng-zorro-antd/select';

@NgModule({
  imports: [
    CommonModule,
    FunctionariesRoutingModule,
    SharedModule,
  ],
  declarations: [
    FunctionaryListComponent,
  ],
  entryComponents: [
  ]
})
export class FunctionariesModule { }
