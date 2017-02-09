import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { NgHomeComponent }  from './home/home.component';
import { NgLoginComponent }  from './login/login.component';

import { routing } from './app.routing.module';


@NgModule({
    imports: [BrowserModule, routing],
    declarations: [AppComponent, NgHomeComponent, NgLoginComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
