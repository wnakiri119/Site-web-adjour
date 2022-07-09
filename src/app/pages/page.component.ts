import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  showBackToTop= false;

  constructor() { }

  ngOnInit(): void {
  }


  public scrollToTop() {
    const scrollDuration = 200;
    const scrollStep = -window.pageYOffset  / (scrollDuration / 20);
    const scrollInterval = setInterval(() => {
      if (window.pageYOffset != 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 10);
    if (window.innerWidth <= 768) {
      setTimeout(() => { window.scrollTo(0, 0); });
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    ($event.target.documentElement.scrollTop > 300) ? this.showBackToTop = true : this.showBackToTop = false;
  }

}
