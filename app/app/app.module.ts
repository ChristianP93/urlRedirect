import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';


import { AppComponent } from './app.component';
import { NgHomeComponent }  from './home/home.component';
import { NgLoginComponent }  from './login/login.component';
import { NgCreateAccountComponent }  from './createAccount/createAccount.component';
import { NgReportLinkComponent } from './report/reportLink/reportLink.component';
import { NgReportLinkUserComponent } from './report/reportLinkUser/reportLinkUser.component';

import { LoginService } from './login/login.service';
import { ReportService } from './report/report.service';

import { routing } from './app.routing.module';


// Directive
import { NgInit } from './directive/ngInit/ngInit.directive';

// Libs
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

// filter
import { NoRepeatPipe } from './filterPipe/noRepeat.pipe';


@NgModule({
    imports: [BrowserModule, routing, FormsModule, HttpModule, JsonpModule, Ng2Bs3ModalModule],
    declarations: [AppComponent, NgHomeComponent, NgLoginComponent, NgCreateAccountComponent, NgInit, NgReportLinkComponent,
        NgReportLinkUserComponent, NoRepeatPipe],
    providers: [Location, { provide: LocationStrategy, useClass: HashLocationStrategy }, LoginService, ReportService],
    bootstrap: [AppComponent]
})
export class AppModule {
    location: Location;
    constructor(location: Location) { this.location = location; }
}
