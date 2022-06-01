import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.scss'],
})
export class AllJobsComponent implements OnInit {
  jobData: Job[] = [];
  totalJobs: number = 0;
  constructor(
    private jobService: JobService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.jobService.getAllJobs().subscribe((res: any) => {
      this.spinner.hide();
      this.jobData = res.jobs;
      this.totalJobs = res.totalJobs;
      console.log(res);
    });
  }
}
