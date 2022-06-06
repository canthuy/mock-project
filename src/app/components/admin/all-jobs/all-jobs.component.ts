import { ActivatedRoute } from '@angular/router';
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
  private jobSubscription: Subscription;

  public param = {
    status: 'all',
    jobType: 'all',
    sort: 'latest',
    page: '1',
    search: '',
  };

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
    this.jobSubscription = this.jobService.status.subscribe((st) => {
      this.param.status = st;
    });

    let s = this.jobService.jobsChange.subscribe((res: any) => {
      this.spinner.hide();
      this.jobData = res.jobs;
      this.totalJobs = res.totalJobs;
      this.numOfPages = res.numOfPages;
    });

    this.jobSubscription.add(s);
  }

  goToPage(page) {
    this.spinner.show();
    this.param.page = page;
    this.jobService.getJobs(this.param).subscribe((res: any) => {
      this.spinner.hide();
    });
  }

  saveDataForm(p) {
    this.param.search = p.search;
    this.param.jobType = p.jobType;
    this.param.sort = p.sort;
    this.param.status = p.status;
  }
  ngOnDestroy() {
    this.jobSubscription.unsubscribe();
  }
}
