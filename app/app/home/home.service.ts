import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from '../login/user';

@Injectable()

export class HomeService {
    private server = 'http://localhost:3000/api/v1/';
    private token = localStorage.getItem('token');
    private headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    private options = new RequestOptions({ headers: this.headers });
    constructor(private http: Http) { }



    getUsers(): Observable<User[]> {
        return this.http.get(this.server + 'url/info/', this.options).map(res => {
            return this.extractData(res);
        }).catch(err => this.handleError(err));
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: Response | any) {
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
