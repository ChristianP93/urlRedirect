import {Input, Component} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

import { User } from '../login/user';

@Component({
    selector: 'ng-create-account',
    providers: [LoginService],
    templateUrl: './app/createAccount/template/createAccount.template.html'
})

export class NgCreateAccountComponent {
    user: User[];
    public error: String;
    public errorMessage = String;

    @Input() mail: string;
    @Input() password: string;

    constructor(private router: Router, private loginService: LoginService) { }

    onSubmit(mail: string, password: string) {
        let userData: Object = { 'user': { 'mail': this.mail, 'password': this.password } };
        this.loginService.createUser(userData).subscribe(
            (data: any) => {
                let userToken: string = (data.token);
                localStorage.setItem('token', userToken);
                return this.router.navigate(['home']);
            },
            error => {
                this.error = 'Mail exist';
                this.errorMessage = error.err;
            }
        );
    }
}
