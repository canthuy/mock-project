import { JobService } from 'src/app/services/job.service';
import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  @Input('job') job: Job;
  public jobStatus: string[] = ['pending', 'interview', 'declined'];
  constructor(private jobService: JobService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  get job_status() {
    return this.job.status;
  }

  // Delete Job
  public onDelete(id: string) {
    Swal.fire({
      title: 'Are you sure you want to delete this job?',
      text: 'This job will be removed immediately. You cannot undo this action. ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.jobService.deleteJob(id).subscribe((res: any) => {
          this.toastr.success(res.msg, '', {
            timeOut: 5000,
            toastClass: 'ngx-toastr mt-2 toast-success',
          });
        });
      }
    });
  }
}
