import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypesRoutingModule } from './types-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { TypeListComponent } from './type-list/type-list.component';

@NgModule({
  imports: [
    CommonModule,
    TypesRoutingModule,
    SharedModule
  ],
  declarations: [
    TypeListComponent,
  ],
  entryComponents: [
  ]
})
export class TypesModule { }
