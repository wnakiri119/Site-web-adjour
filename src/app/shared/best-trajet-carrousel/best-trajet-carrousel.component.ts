import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SwiperConfigInterface} from "ngx-swiper-wrapper";
import {Colis} from "../../_model/colis";
import {COLIS_FIND_ARCHIVED_IS_FALSE__GET} from "../../_api_config/route-api";
import {HttpClient} from "@angular/common/http";
import {AppSettingService} from "../../services/app-setting.service";

@Component({
  selector: 'app-best-trajet-carrousel',
  templateUrl: './best-trajet-carrousel.component.html',
  styleUrls: ['./best-trajet-carrousel.component.scss']
})
export class BestTrajetCarrouselComponent implements OnInit, AfterViewInit {

  colisLastregister:Colis[];
  config: SwiperConfigInterface={};
  constructor(private http: HttpClient,
              public appSettings: AppSettingService) { }

  ngOnInit(): void {
    this.colisFindArchivedIsFalese();

    this.config = {
      observer: true,
      slidesPerView: 4,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        3000: {
          slidesPerView: 4,
        }

      }
    }
  }

  ngAfterViewInit(): void {
    this.config = {
      observer: true,
      slidesPerView: 4,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        3000: {
          slidesPerView: 4,
        }

      }
    }
  }

  private colisFindArchivedIsFalese() {
    this.http.get<any>(`${COLIS_FIND_ARCHIVED_IS_FALSE__GET}page=0&size=100`).subscribe(data =>{
      this.colisLastregister = data.content;
    })
  }

}
