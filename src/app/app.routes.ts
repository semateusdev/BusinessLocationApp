import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./page/home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'business',
        children: [
            {
                path: '',
                loadComponent: () => import('./page/business/bussiness-list/business-list.component').then(c => c.BusinessListComponent)
            },
            {
                path: 'create',
                loadComponent: () => import('./page/business/create-business/create-business.component').then(c => c.CreateBusinessComponent)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
