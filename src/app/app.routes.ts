import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./page/home/home.component').then(c => c.HomeComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
