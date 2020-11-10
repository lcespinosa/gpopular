import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cpopulars',
        loadChildren: () => import('./cpopulars/cpopulars.module').then(m => m.CpopularsModule),
      },
      {
        path: 'streets',
        loadChildren: () => import('./streets/streets.module').then(m => m.StreetsModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalizationRoutingModule { }
