import { Component } from '@angular/core';
import { LoginService } from './login.service';


@Component({
    selector: 'ng-login',
    providers: [LoginService],
    templateUrl: './app/login/template/login.template.html'

})
export class NgLoginComponent {
    errorMessage: string;
    // user: User[];
    user = {
        'mail': '',
        'password': ''
    };
    token: string;

    constructor(private loginService: LoginService) { }

    onSubmit(user: Object) {
        console.log(user);
        let userToken: any;
        this.loginService.loginUser({ 'user': user }).subscribe(
            token => {
                console.log(token);
                console.log(token.token);
                console.log(localStorage);
                userToken = (token.token);
                localStorage.setItem('token', userToken);
                // return window.location('/home');

            },
            error => this.errorMessage = <any>error
        );
    }
}
