import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SwiperConfigInterface} from "ngx-swiper-wrapper";
import {AppSettingService} from "../../services/app-setting.service";

@Component({
  selector: 'app-partenaires',
  templateUrl: './partenaires.component.html',
  styleUrls: ['./partenaires.component.scss']
})
export class PartenairesComponent implements OnInit, AfterViewInit {

  cardsImages = [
    {img: 'assets/img/partenaire/20GFlG3J.jpeg', name:'Camtel'},
    {img: 'assets/img/partenaire/kgjjgjjp2ixvrjtpfyob.png', name:'Airtel'},
    {img: 'assets/img/partenaire/logo-dla.png', name: 'Areoport Du Cameroun'},
    {img: 'assets/img/partenaire/logo_aeroport_douala.png', name: 'Aréoport International de Douala'},
    {img: 'assets/img/partenaire/mtn.jpg', name: 'MTN'},
    {img: 'assets/img/partenaire/orange_logo.png', name: 'Orange Cameroun'},
    {img: 'assets/img/partenaire/pmPRYCGU.png', name:'CEMAC'},
  ]

  config: SwiperConfigInterface = {};

  constructor(public appSetting: AppSettingService ) { }

  ngOnInit(): void {
    this.config = {
      slidesPerView: 7,
      spaceBetween: 32,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: true,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 10000,
        disableOnInteraction: false
      },
      speed: 500,
      effect: "slide",
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        480: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3,
        },
        960: {
          slidesPerView: 4,
        },
        1280: {
          slidesPerView: 5,
        },
        1500: {
          slidesPerView: 6,
        }
      }
    }
  }

  ngAfterViewInit(): void {

  }

}
