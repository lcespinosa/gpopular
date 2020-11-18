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
      {
        path: 'contacts',
        loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalizationRoutingModule { }
