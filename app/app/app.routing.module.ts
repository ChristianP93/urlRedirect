import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ngLoginRoute } from './login/login.route';
import { ngHomeRoute } from './home/home.route';
import { ngCreateAccountRoute } from './createAccount/createAccount.route';
import { ngReportLinkRoute } from './report/reportLink/report.route';
import { ngReportLinkUserRoute } from './report/reportLinkUser/reportLinkUser.route';
import { BarChartDemoRoute } from './report/graph/graph.router';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    ...ngLoginRoute,
    ...ngHomeRoute,
    ...ngCreateAccountRoute,
    ...ngReportLinkRoute,
    ...ngReportLinkUserRoute,
    ...BarChartDemoRoute
    // ...createProjectRoute
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
