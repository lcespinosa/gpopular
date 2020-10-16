import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '../shared/layout/layout.component';
import { CpopularListComponent } from './cpopular-list/cpopular-list.component';
import { CpopularDetailComponent } from './cpopular-detail/cpopular-detail.component';
import { CpopularAddComponent } from './cpopular-add/cpopular-add.component';
import { CpopularEditComponent } from './cpopular-edit/cpopular-edit.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: CpopularListComponent },
      { path: '/add', component: CpopularAddComponent },
      { path: '/edit', component: CpopularEditComponent },
      { path: '/details', component: CpopularDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CpopularsRoutingModule { }
