import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'demands',
        loadChildren: () => import('./demands/demands.module').then(m => m.DemandsModule),
      },
      {
        path: 'replies',
        loadChildren: () => import('./replies/replies.module').then(m => m.RepliesModule),
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
export class ManagementRoutingModule { }
