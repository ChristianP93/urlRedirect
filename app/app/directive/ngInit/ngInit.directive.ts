import { Directive, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Directive({
    selector: '[ngInit]'
})

export class NgInit implements OnInit {
    token: string;
    // @Input('ng-init') isLogged: Boolean;

    constructor(private router: Router) { }


    ngOnInit() {
        this.token = localStorage.getItem('token');
        if (this.token) {
            return this.router.navigate(['home']);
        }
    }
}
