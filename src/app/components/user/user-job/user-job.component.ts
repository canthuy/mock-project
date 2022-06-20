import { UserJob } from 'src/app/models/userJob.model';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-user-job',
  templateUrl: './user-job.component.html',
  styleUrls: ['./user-job.component.scss'],
})
export class UserJobComponent implements OnInit {
  @Input('job') job: UserJob;
  public images = [
    '../../assets/images/company/img-default-logo.svg',
    '../../assets/images/company/10304843.png',
    '../../assets/images/company/10302517.png',
  ];
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  public openDetail(content) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }
}
