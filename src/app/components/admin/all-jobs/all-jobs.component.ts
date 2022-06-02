import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/services/job.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.scss'],
})
export class AllJobsComponent implements OnInit {
  public allJobRes: any;
  private jobSubcription: Subscription;
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
      this.allJobRes = res;
      this.jobData = res.jobs;
      this.totalJobs = res.totalJobs;
      this.numOfPages = res.numOfPages;
    });
    this.jobSubcription = this.jobService.jobsChange.subscribe((res: any) => {
      this.jobData = res.jobs;
      this.totalJobs = res.totalJobs;
      this.numOfPages = res.numOfPages;
    });
  }

  goToPage(page) {
    this.spinner.show();
    this.jobService.nextPageAllJobs(page).subscribe((res: any) => {
      this.spinner.hide();
    });
  }

  ngOnDestroy() {
    this.jobSubcription.unsubscribe();
  }
}
