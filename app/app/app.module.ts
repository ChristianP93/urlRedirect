import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';


import { AppComponent } from './app.component';

import { NgHomeComponent }  from './home/home.component';
import { NgLoginComponent }  from './login/login.component';
import { LoginService } from './login/login.service';
import { routing } from './app.routing.module';


@NgModule({
    imports: [BrowserModule, routing, FormsModule, HttpModule, JsonpModule],
    declarations: [AppComponent, NgHomeComponent, NgLoginComponent],
    providers: [LoginService],
    bootstrap: [AppComponent]
})
export class AppModule { }
