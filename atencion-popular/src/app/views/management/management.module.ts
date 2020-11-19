import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NomenclaturesRoutingModule } from './nomenclatures-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NomenclaturesRoutingModule,
    SharedModule,
  ],
  declarations: [],
  entryComponents: [
  ]
})
export class NomenclaturesModule { }
