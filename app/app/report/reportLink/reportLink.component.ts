import { Component, OnInit} from '@angular/core';

import { ReportService } from '../report.service';

// import { Report } from '../report';

@Component({
    selector: 'reportLink',
    templateUrl: './app/report/reportLink/template/reportLink.template.html',
    styleUrls: ['./app/report/reportLink/reportLink.style.css']
})

export class NgReportLinkComponent implements OnInit {
    reports: any[] = [];

    constructor(private reportService: ReportService) { }

    ngOnInit() {
        this.reportService.getReportLink().subscribe((data: any) => {
            return data.result.map((index: any) => {
                return this.reports.push(index);
            });
        });
    }

}
