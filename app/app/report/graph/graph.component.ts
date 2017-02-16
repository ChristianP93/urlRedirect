import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ReportService } from '../report.service';

@Component({
    selector: 'bar-chart-demo',
    templateUrl: './app/report/graph/template/graph.template.html',
    providers: [ReportService]
})
export class BarChartDemoComponent implements OnInit {

    reports: any[] = [];
    users: any[] = [];
    allDataUsers: any[] = [];
    graph: any = false;

    public barChartData: any[] = [];

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = [];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public polarAreaChartLabels: string[] = [];
    public polarAreaChartData: number[] = [];
    public polarAreaLegend: boolean = true;
    public polarAreaChartType: string = 'polarArea';


    constructor(private reportService: ReportService, private router: Router) { }
    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    ngOnInit() {
        this.reportService.getReportLink().subscribe((data: any) => {
            data.result.map((index: any) => {
                return this.allDataUsers.push(index);
            });
            return this.func();
        });
    }

    func() {
        if (this.allDataUsers.length === 0) { return; };
        let counter: number;
        this.allDataUsers.map((index: any, value: number) => {
            if (this.reports.hasOwnProperty(index.refer)) {
                this.reports[index.refer].counter.push(index.url);
                counter++;
            } else {
                this.reports[index.refer] = { counter: [index.url] };
                this.users.push(this.allDataUsers.splice(value, 1)[0].refer);
                counter++;
            }
        });
        return this.createGraph();
    }

    createGraph() {
        this.users.map((index: string) => {
            this.barChartData.push({ 'data': [this.reports[index].counter.length], 'label': index });
            this.polarAreaChartData.push(parseInt(this.reports[index].counter.length, 10));
            this.polarAreaChartLabels.push(index);
        });
        this.graph = true;
    }


}
