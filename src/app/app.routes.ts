import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./page/home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'locations',
        loadComponent: () => import('./page/locations/locations-list/locations-list.component').then(c => c.LocationsListComponent)
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
