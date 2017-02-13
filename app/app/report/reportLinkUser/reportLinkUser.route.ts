import { Routes } from '@angular/router';

import { NgReportLinkUserComponent } from './reportLinkUser.component';

export const ngReportLinkUserRoute: Routes = [
    { path: 'reportLink/:id', component: NgReportLinkUserComponent }
];
