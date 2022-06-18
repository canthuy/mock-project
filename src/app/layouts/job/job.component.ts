import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Job } from 'src/app/models/job.model';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  @Input('job') job: Job;
  @Input('param') param;
  @Output('delete') delete = new EventEmitter();
  private jobDetails = [
    {
      type: 'internship',
      salary: 400,
      experience: 'None',
    },
    {
      type: 'remote',
      salary: 700,
      experience: '1+ years',
    },
    {
      type: 'full-time',
      salary: 1200,
      experience: '2+ years',
    },
    {
      type: 'part-time',
      salary: 800,
      experience: '1+ years',
    },
  ];

  public jobStatus: string[] = ['pending', 'interview', 'declined'];
  public jobDetail: {
    type: string;
    salary: number;
    experience: string;
  };
  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.jobDetail = this.jobDetails.find(
      (value) => value.type === this.job.jobType
    );
  }

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
        this.delete.emit(id);
      }
    });
  }

  public openDetail(content) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }
}
