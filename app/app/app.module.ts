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

import { LoginService } from './login/login.service';
import { ReportService } from './report/report.service';

import { routing } from './app.routing.module';


// Directive
import { NgInit } from './directive/ngInit/ngInit.directive';


@NgModule({
    imports: [BrowserModule, routing, FormsModule, HttpModule, JsonpModule],
    declarations: [AppComponent, NgHomeComponent, NgLoginComponent, NgCreateAccountComponent, NgInit, NgReportLinkComponent],
    providers: [Location, { provide: LocationStrategy, useClass: HashLocationStrategy }, LoginService, ReportService],
    bootstrap: [AppComponent]
})
export class AppModule {
    location: Location;
    constructor(location: Location) { this.location = location; }
}
