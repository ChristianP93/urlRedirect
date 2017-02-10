import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';


import { AppComponent } from './app.component';
import { NgHomeComponent }  from './home/home.component';
import { NgLoginComponent }  from './login/login.component';
import { LoginService } from './login/login.service';
import { routing } from './app.routing.module';


// Lib


@NgModule({
    imports: [BrowserModule, routing, FormsModule, HttpModule, JsonpModule],
    declarations: [AppComponent, NgHomeComponent, NgLoginComponent],
    // providers: [],
    providers: [Location, { provide: LocationStrategy, useClass: HashLocationStrategy }, LoginService],
    bootstrap: [AppComponent]
})
export class AppModule {
    location: Location;
    constructor(location: Location) { this.location = location; }
}
