import { Component, Input } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

import { User } from './user';


@Component({
    selector: 'ng-login',
    providers: [LoginService],
    templateUrl: './app/login/template/login.template.html'
})

export class NgLoginComponent {
    errorMessage: string;
    user: User[];

    @Input() mail: string;
    @Input() password: string;

    constructor(private loginService: LoginService, private router: Router) { }

    onSubmit(mail: string, password: string) {
        let userData: Object = { 'user': { 'mail': this.mail, 'password': this.password } };
        this.loginService.loginUser(userData).subscribe(
            (data: any) => {
                let userToken: string = (data.token);
                localStorage.setItem('token', userToken);
                return this.router.navigate(['home']);
            },
            error => this.errorMessage = <any>error
        );
    }
}
