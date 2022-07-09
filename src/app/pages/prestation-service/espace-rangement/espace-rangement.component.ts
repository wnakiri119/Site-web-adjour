import { Component, OnInit } from '@angular/core';
import {AppSettingService} from "../../../services/app-setting.service";
import {SwiperConfigInterface, SwiperPaginationInterface} from "ngx-swiper-wrapper";

@Component({
  selector: 'app-espace-rangement',
  templateUrl: './espace-rangement.component.html',
  styleUrls: ['./espace-rangement.component.scss']
})
export class EspaceRangementComponent implements OnInit {

  private heigthCarrousel='250px';
  public config: SwiperConfigInterface = {};
  private pagination: SwiperPaginationInterface = {
    el: '#swiper-pagination-12',
    clickable: true
  };

  myCarouselImages = [
    {img: 'assets/img/pages/expace-rangement-carousel/expace-rangement.jpg'},
    {img: 'assets/img/pages/expace-rangement-carousel/expace-rangement-2.jpg'},
    {img: 'assets/img/pages/expace-rangement-carousel/Transport-Vehicule-Afrique.png'},
  ]


  constructor(public appSettings: AppSettingService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const div = document.getElementById('page3');

    div.innerHTML = this.appSettings.langue.page_expace_rangement;

    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,
      keyboard: true,
      navigation: true,
      pagination: this.pagination,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 12000,
        disableOnInteraction: false
      },
      speed: 250,
      effect: "fade"
    }

  }

  public getBgImage(index){
    // console.log(this.pathImage + index );
    return {
      'background-image': index != null ? "url(" + index + ")" : "url(https://via.placeholder.com/600x400/ff0000/fff/)",
      'background-size': '100%',
      'background-repeat': 'no-repeat',
      'height': this.heigthCarrousel,
      'width': '100%',
    };
  }
}
