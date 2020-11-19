import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'entities',
        loadChildren: () => import('./entities/entities.module').then(m => m.EntitiesModule),
      },
      {
        path: 'functionaries',
        loadChildren: () => import('./functionaries/functionaries.module').then(m => m.FunctionariesModule),
      },
      {
        path: 'topics',
        loadChildren: () => import('./topics/topics.module').then(m => m.TopicsModule),
      },
      {
        path: 'demand_cases',
        loadChildren: () => import('./demand_cases/demand_cases.module').then(m => m.DemandCasesModule),
      },
      {
        path: 'types',
        loadChildren: () => import('./types/types.module').then(m => m.TypesModule),
      },
      {
        path: 'ways',
        loadChildren: () => import('./ways/ways.module').then(m => m.WaysModule),
      },
      {
        path: 'results',
        loadChildren: () => import('./results/results.module').then(m => m.ResultsModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NomenclaturesRoutingModule { }
