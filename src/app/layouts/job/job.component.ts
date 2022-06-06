import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job.model';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobService } from 'src/app/services/job.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  @Input('job') job: Job;
  @Input('param') param;
  public jobStatus: string[] = ['pending', 'interview', 'declined'];
  constructor(
    private jobService: JobService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  get job_status() {
    return this.job.status;
  }

  // Delete Job
  public onDelete(id: string) {
    Swal.fire({
      title: 'Delete Job',
      text: 'Are you sure you want to delete this job? This job will be removed permanently. ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.jobService.deleteJob(id).subscribe((res: any) => {
          this.spinner.hide();
          this.jobService.getJobs(this.param).subscribe((res) => {
            this.jobService.jobsChange.next(res);
          });
          this.toastr.success(res.msg, '', {
            timeOut: 5000,
            toastClass: 'ngx-toastr mt-2 toast-success',
          });
        });
      }
    });
  }
}
