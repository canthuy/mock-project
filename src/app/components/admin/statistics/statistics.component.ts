import { NgxSpinnerService } from 'ngx-spinner';
import { JobService } from 'src/app/services/job.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  public totalStats: {
    pending: number;
    interview: number;
    declined: number;
  } = {
    pending: 0,
    interview: 0,
    declined: 0,
  };
  public barChart: boolean = true;

  // Data for chart
  public series: any[] = [];
  public data: any[] = [];
  public view: [number, number] = [700, 300];
  public legend: boolean = false;
  public legendPosition = 'below';
  public legendTitle: string = '';
  public showLabels: boolean = true;
  public animations: boolean = true;
  public xAxis: boolean = true;
  public yAxis: boolean = true;
  public timeline: boolean = true;
  public showXAxisLabel: boolean = true;
  public showYAxisLabel: boolean = true;
  public xAxisLabel: string = 'Month';
  public yAxisLabel: string = 'Number of Job';

  public colorScheme = {
    domain: [
      '#683cb7',
      '#059689',
      '#ea1e63',
      '#7aa3e5',
      '#2a4f74',
      '#00524b',
      '#205803',
    ],
  };

  constructor(
    private jobService: JobService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.jobService.getStats().subscribe((res: any) => {
      this.spinner.hide();
      this.totalStats = res.defaultStats;
      this.series = res.monthlyApplications.map((val) => {
        return {
          name: val.date,
          value: val.count,
        };
      });
      this.data = this.series;
    });
  }

  // Change chart mode
  public onChangeChart() {
    this.barChart = !this.barChart;
    if (this.barChart) {
      this.data = this.series;
    } else {
      this.data = [
        {
          name: 'Applications',
          series: this.series,
        },
      ];
    }
  }
}
