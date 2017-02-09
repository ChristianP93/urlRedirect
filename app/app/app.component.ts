import { Component } from '@angular/core';

@Component({
    selector: 'app',
    template: `
    <nav class="navbar navbar-inverse navbar-static-top example6">
      <div class="customContainer">
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><a routerLink="/home" routerLinkActive="active">Home</a></li>
            <li><a routerLink="/login" routerLinkActive="active">Login</a></li>
            <li><a routerLink="/" routerLinkActive="active">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <router-outlet></router-outlet>`
})
export class AppComponent { }
