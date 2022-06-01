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
  constructor(
    private jobService: JobService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.jobService.getStats().subscribe((res: any) => {
      this.spinner.hide();
      this.totalStats = res.defaultStats;
    });
  }
}
