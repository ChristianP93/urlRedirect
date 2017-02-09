import { Component } from '@angular/core';
import { LoginService } from './login.service';
// import { User } from './user';

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
    }
    token: string;

    constructor(private loginService: LoginService) { }

    onSubmit(user: Object) {
        console.log(user);
        this.loginService.loginUser(user).subscribe(
            token => token = (token),
            error => this.errorMessage = <any>error
        );
    }
}
