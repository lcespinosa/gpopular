import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpopularsRoutingModule } from './cpopulars-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CpopularListComponent } from './cpopular-list/cpopular-list.component';
import { CpopularDetailComponent } from './cpopular-detail/cpopular-detail.component';
import { CpopularAddComponent } from './cpopular-add/cpopular-add.component';
import { CpopularEditComponent } from './cpopular-edit/cpopular-edit.component';

@NgModule({
  imports: [
    CommonModule,
    CpopularsRoutingModule,
    SharedModule
  ],
  declarations: [
    CpopularListComponent,
    CpopularDetailComponent,
    CpopularAddComponent,
    CpopularEditComponent,
  ],
  entryComponents: [
  ]
})
export class CpopularsModule { }
