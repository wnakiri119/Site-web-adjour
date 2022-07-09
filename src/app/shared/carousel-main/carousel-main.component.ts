import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {SwiperConfigInterface, SwiperPaginationInterface} from "ngx-swiper-wrapper";
import {AppSettingService} from "../../services/app-setting.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {timeout} from "rxjs/operators";

@Component({
  selector: 'app-carousel-main',
  templateUrl: './carousel-main.component.html',
  styleUrls: ['./carousel-main.component.scss']
})
export class CarouselMainComponent implements OnInit, AfterViewInit {

  myCarouselImages =[
    {
      img: 'assets/img/unnamed.jpg',
      title_en: 'titre en englais',
      subtitle_en: 'sous titre en anglais',
      title_fr: 'Contrary to popular belief, Lorem Ipsum',
      subtitle_fr: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC'
    },

    {
      img: 'assets/img/package-delivery-express-concept-vector.jpg',
      title_en: 'titre en englais',
      subtitle_en: 'sous titre en anglais',
      title_fr: 'Contrary to popular belief, Lorem Ipsum',
      subtitle_fr: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC'
    },

    {
      img: 'assets/img/concept-global.jpg',
      title_en: 'titre en englais',
      subtitle_en: 'sous titre en anglais',
      title_fr: 'Contrary to popular belief, Lorem Ipsum',
      subtitle_fr: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC'
    }
  ];

  public config: SwiperConfigInterface = {};
  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };

  formDemandeDevis: FormGroup;
  show: boolean = true;

  constructor(public appSettings: AppSettingService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formDemandeDevis = this.formBuilder.group({
      poids: ['', Validators.compose([Validators.required])],
      largeur: '',
      hauteur: '',
      destination: '',
      source: '',
    })
  }


  public getBgImage(index){
    // console.log(this.pathImage + index );
    return {
      'background-image': index != null ? "url(" + index + ")" : "url(https://via.placeholder.com/600x400/ff0000/fff/)",
      'background-size': '100%',
      'background-repeat': 'no-repeat',
      'width': '100%',
    };
  }

  ngAfterViewInit(): void {
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
        delay: 9000,
        disableOnInteraction: false
      },
      speed: 500,
      effect: "fade"
    }
  }

  doEffect() {
    this.show = false;
    setTimeout(()=>{this.show = true}, 300);
  }

}
