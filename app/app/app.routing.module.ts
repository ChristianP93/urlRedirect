import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ngLoginRoute } from './login/login.route';
import { ngHomeComponent } from './home/home.route';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    ...ngLoginRoute,
    ...ngHomeComponent
    // ...createProjectRoute
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
