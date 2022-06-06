import { CanComponentDeactivate } from './../../../models/canDeactivate';
import { Job } from 'src/app/models/job.model';
import { JobService } from './../../../services/job.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss'],
})
export class EditJobComponent implements OnInit, CanComponentDeactivate {
  public editMode: boolean;
  public arrStatus: string[] = ['pending', 'interview', 'declined'];
  public jobTypes: string[] = [
    'full-time',
    'part-time',
    'remote',
    'internship',
  ];

  public jobForm: FormGroup;

  private job: Job = {
    company: '',
    position: '',
    status: 'pending',
    jobType: 'full-time',
    jobLocation: '',
    createdBy: '',
    _id: '',
    updatedAt: '',
    createdAt: '',
  };
  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  canExit = () => {
    let currentJob = {
      position: '',
      company: '',
      jobLocation: '',
      status: 'pending',
      jobType: 'full-time',
    };
    if (this.editMode) {
      currentJob = {
        position: this.job.position,
        company: this.job.company,
        jobLocation: this.job.jobLocation,
        status: this.job.status,
        jobType: this.job.jobType,
      };
      if (JSON.stringify(currentJob) !== JSON.stringify(this.jobForm.value)) {
        let result = confirm(
          "You haven't saved your editing yet, are you sure to navigate away?"
        );
        return result;
      }
    } else {
      if (JSON.stringify(currentJob) !== JSON.stringify(this.jobForm.value)) {
        let result = confirm(
          "You haven't saved your editing yet, are you sure to navigate away?"
        );
        return result;
      }
    }
    return true;
  };

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.initForm(param.id);
    });
  }

  // getter
  get position() {
    return this.jobForm.get('position');
  }
  get company() {
    return this.jobForm.get('company');
  }
  get jobLocation() {
    return this.jobForm.get('jobLocation');
  }
  get status() {
    return this.jobForm.get('status');
  }
  get jobType() {
    return this.jobForm.get('jobType');
  }

  // Init Form
  private initForm(id: string) {
    if (id) {
      this.editMode = true;
      if (this.jobService.getJobById(id)) {
        this.job = this.jobService.getJobById(id);
      } else {
        this.router.navigate(['/admin/jobs']);
      }
    } else {
      this.editMode = false;
    }
    this.jobForm = new FormGroup({
      position: new FormControl(this.job.position, [Validators.required]),
      company: new FormControl(this.job.company, [Validators.required]),
      jobLocation: new FormControl(this.job.jobLocation, [Validators.required]),
      status: new FormControl(this.job.status),
      jobType: new FormControl(this.job.jobType),
    });
  }

  // Submit Form
  public onSubmit() {
    this.spinner.show();
    if (this.editMode) {
      this.jobService.updateJob(this.job._id, this.jobForm.value).subscribe(
        (res) => {
          this.spinner.hide();
          this.toastr.success('Your change have been successfully saved', '', {
            timeOut: 5000,
            toastClass: 'ngx-toastr mt-2 toast-success',
          });
          this.router.navigate(['/admin/jobs']);
        },
        (err) => {
          this.spinner.hide();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.msg,
          });
        }
      );
    } else {
      this.jobService.addJob(this.jobForm.value).subscribe(
        (res) => {
          this.spinner.hide();
          this.toastr.success('Job created successfully', '', {
            timeOut: 5000,
            toastClass: 'ngx-toastr mt-2 toast-success',
          });
          this.router.navigate(['/admin/jobs']);
        },
        (err) => {
          this.spinner.hide();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.msg,
          });
        }
      );
    }
  }

  // Cancel
  public onCancel() {
    if (this.editMode) {
      this.router.navigate(['/admin/jobs']);
    } else {
      this.router.navigate(['/admin']);
    }
  }
}
