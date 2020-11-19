import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'localization',
    loadChildren: () => import('./views/localization/localization.module').then(m => m.LocalizationModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'nomenclatures',
    loadChildren: () => import('./views/nomenclatures/nomenclatures.module').then(m => m.NomenclaturesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'management',
    loadChildren: () => import('./views/management/management.module').then(m => m.ManagementModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
