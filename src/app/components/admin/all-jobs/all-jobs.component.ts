import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/services/job.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
  totalJobs: number = 0;
  numOfPages: number = 0;

  constructor(
    private jobService: JobService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.jobSubscription = this.jobService.status.subscribe((st) => {
      this.param.status = st;
    });

    // let s = this.jobService.jobsChange.subscribe((res: any) => {
    //   this.spinner.hide();
    //   console.log('init');

    //   this.jobData = res.jobs;
    //   this.totalJobs = res.totalJobs;
    //   this.numOfPages = res.numOfPages;
    // });

    // this.jobSubscription.add(s);
  }

  public goToPage(page) {
    this.spinner.show();
    this.param.page = page;
    this.jobService.getJobs(this.param).subscribe((res: any) => {
      this.spinner.hide();
      console.log('call api');

      this.jobData = res.jobs;
      this.totalJobs = res.totalJobs;
      this.numOfPages = res.numOfPages;
    });
  }

  public saveDataForm(p) {
    this.param.search = p.search;
    this.param.jobType = p.jobType;
    this.param.sort = p.sort;
    this.param.page = '1';
    this.param.status = p.status;
    this.jobService.getJobs(this.param).subscribe((res: any) => {
      this.jobData = res.jobs;
      this.totalJobs = res.totalJobs;
      this.numOfPages = res.numOfPages;
    });
  }

  public onDelete(id) {
    this.jobService.deleteJob(id).subscribe((res: any) => {
      this.spinner.hide();
      this.jobService.getJobs(this.param).subscribe((res) => {
        this.jobData = res.jobs;
        this.totalJobs = res.totalJobs;
        this.numOfPages = res.numOfPages;
      });
      this.toastr.success(res.msg, '', {
        timeOut: 5000,
        toastClass: 'ngx-toastr mt-2 toast-success',
      });
    });
  }
  ngOnDestroy() {
    this.jobSubscription.unsubscribe();
  }
}
