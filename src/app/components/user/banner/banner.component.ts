import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;
  constructor() {}

  ngOnInit(): void {}

  public images = [
    '../../assets/user-job/Bannerlg_119708.webp',
    '../../assets/user-job/Lazada_hr1banner_108340.webp',
    '../../assets/user-job/Nestle_hrbanner1_109574.png',
  ];

  public paused = false;
  public unpauseOnArrow = false;
  public pauseOnIndicator = false;
  public pauseOnHover = true;

  public togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  public onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }
}
