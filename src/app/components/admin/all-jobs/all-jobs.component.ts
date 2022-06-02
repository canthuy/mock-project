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
  filteredJob: Job[] = [];
  totalJobs: number = 0;
  numOfPages: number = 0;

  constructor(
    private jobService: JobService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.jobService.getAllJobs().subscribe((res: any) => {
      this.spinner.hide();
      this.filteredJob = this.jobData = res.jobs;
      this.totalJobs = res.totalJobs;
      this.numOfPages = res.numOfPages;
      console.log(res);
    });
  }

  goToPage(page) {
    this.jobService.nextPageAllJobs(page).subscribe((res: any) => {
      console.log(res);
    });
  }
}
