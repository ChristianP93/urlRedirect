import { Component, OnInit} from '@angular/core';

import { ReportService } from '../report.service';
import { Router } from '@angular/router';

// import { Report } from '../report';

@Component({
    selector: 'reportLink',
    templateUrl: './app/report/reportLink/template/reportLink.template.html',
    providers: [ReportService],
    styleUrls: ['./app/report/reportLink/reportLink.style.css']
})

export class NgReportLinkComponent implements OnInit {
    reports: any[] = [];

    constructor(private reportService: ReportService, private router: Router) { }

    ngOnInit() {
        this.reportService.getReportLink().subscribe((data: any) => {
            return data.result.map((index: any) => {
                return this.reports.push(index);
            });
        });
    }

    showDetails(param: string) {
        return this.router.navigate(['reportLink/' + param]);
    }

}
