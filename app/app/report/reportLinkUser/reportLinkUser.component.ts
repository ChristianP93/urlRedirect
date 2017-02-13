import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ReportService } from '../report.service';
// import { URLSearchParams } from '@angular/http';

@Component({
    selector: 'reportLinkUser',
    templateUrl: './app/report/reportLinkUser/template/reportLinkUser.template.html',
    providers: [ReportService],
    styleUrls: ['./app/report/reportLinkUser/reportLinkUser.style.css']
})

export class NgReportLinkUserComponent implements OnInit {
    links: any[] = [];

    constructor(private reportService: ReportService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            return this.reportService.getLinkByUser(params).subscribe((data: any) => {
                data.result.map((index: any) => {
                    return this.links.push(index);
                });
            });
        });
    }

}
