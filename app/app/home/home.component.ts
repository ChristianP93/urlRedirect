import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HomeService } from './home.service';

@Component({
    selector: 'ng-home',
    templateUrl: './app/home/template/home.template.html',
    styleUrls: ['./app/home/home.style.css'],
    providers: []
})
export class NgHomeComponent implements OnInit {
    public users: any[] = [];
    public products: any[] = [];
    public brands: any[] = [];

    constructor(private homeService: HomeService, private router: Router) { }

    ngOnInit() {
        return this.homeService.getUsers().subscribe((res: any) => {
            this.users = res.users;
            this.products = res.product;
            this.brands = res.brand;
        });
    }

    showDetailsUser(params: any) {
        let url = 'reportLink/' + params;
        return this.router.navigate([url]);
    }

    showDetailsBrand(params: any) {
        let url = 'reportLink/brand/' + params;
        return this.router.navigate([url]);
    }

    showDetailsProduct(params: any) {
        let url = 'reportLink/product/' + params;
        return this.router.navigate([url]);
    }

}
