import { Injectable } from '@angular/core';
import { Headers, RequestOptions} from '@angular/http';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from './user';

@Injectable()
export class LoginService {
    private server = 'http://localhost:3000/api/v1/';  // URL to web API

    constructor(private http: Http) { }

    loginUser(user: Object): Observable<User[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.server + 'get/token/', user, options)
            .map(resp => this.extractData(resp))
            .catch(err => this.handleError(err));
    }

    createUser(user: Object): Observable<User[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.server + 'user/create/', user, options)
            .map(resp => this.extractData(resp))
            .catch(err => this.handleError(err));
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }


}
