import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
    },
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'cpopulars',
        loadChildren: './cpopulars/cpopulars.module#CpopularsModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'entities',
        loadChildren: './entities/entities.module#EntitiesModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'topics',
        loadChildren: './topics/topics.module#TopicsModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'functionaries',
        loadChildren: './functionaries/functionaries.module#FunctionariesModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'demand_cases',
        loadChildren: './demand_cases/demand_cases.module#DemandCasesModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'ways',
        loadChildren: './ways/ways.module#WaysModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'results',
        loadChildren: './results/results.module#ResultsModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'streets',
        loadChildren: './streets/streets.module#StreetsModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'customers',
        loadChildren: './customers/customers.module#CustomersModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'users',
        loadChildren: './users/users.module#UsersModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'account',
        loadChildren: './account/account.module#AccountModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'icons',
        loadChildren: './icons/icons.module#IconsModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'typography',
        loadChildren: './typography/typography.module#TypographyModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'about',
        loadChildren: './about/about.module#AboutModule',
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
