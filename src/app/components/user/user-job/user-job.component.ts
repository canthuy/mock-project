import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-user-job',
  templateUrl: './user-job.component.html',
  styleUrls: ['./user-job.component.scss'],
})
export class UserJobComponent implements OnInit {
  jobsArr = [];
  filtered = [];
  constructor(private JobService: JobService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.filtered = this.jobsArr = this.JobService.getUserJobs();
  }

  public openDetail(content) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  onKeyUp(value: string) {
    this.filtered = this.jobsArr.filter((item) => {
      return item.Title.toLowerCase().includes(value.trim().toLowerCase());
    });
  }
}
