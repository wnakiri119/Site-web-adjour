import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AppSettingService} from "../../services/app-setting.service";
import {Expedition} from "../../_model/expedition";
import {SwiperConfigInterface} from "ngx-swiper-wrapper";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {emailValidator} from "../../theme/utils/app-validators";

declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

 // realisationLast: Expedition[] = [];



  cardVillesVisites = [
    {img: 'assets/img/ville-visite/douala2.jpg', name:'Douala'},
    {img: 'assets/img/ville-visite/view-over-yaounde-capital.jpg', name:'Yaounde'},
    {img: 'assets/img/ville-visite/unnamed.jpg', name:'Kribi'},
    {img: 'assets/img/ville-visite/kribi2.jpg', name:'Logos'},
    {img: 'assets/img/ville-visite/ndjamena.jpg', name:'N\'Djamena'},
    {img: 'assets/img/ville-visite/kribi.jpg', name:'Konatri'},
    {img: 'assets/img/ville-visite/ndamena2.jpg', name:'Libreville'}

  ]


  pointFort = [
    {iconeName: 'monetization_on',
      title: this.appSettings.langue?.home_inscription_section_avantage_title1,
      sutitle: this.appSettings.langue?.home_inscription_section_avantage_content1
    },
    {iconeName: 'timer',
      title: this.appSettings.langue?.home_inscription_section_avantage_title2,
      sutitle: this.appSettings.langue?.home_inscription_section_avantage_content2
    },
    {iconeName: 'https',
      title: this.appSettings.langue?.home_inscription_section_avantage_title3,
      sutitle: this.appSettings.langue?.home_inscription_section_avantage_content3
    },
    {iconeName: 'people',
      title: this.appSettings.langue?.home_inscription_section_avantage_title4,
      sutitle: this.appSettings.langue?.home_inscription_section_avantage_content4
    },


  ]

  config: SwiperConfigInterface = {};


  configVilleVisite: SwiperConfigInterface = {};

  contactForm: FormGroup;

  constructor(public appSettings: AppSettingService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });

    this.configVilleVisite = {
      observer: true,
      slidesPerView: 3,
      spaceBetween: 0,
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
        }

      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
    }

  }


  ngAfterViewInit(){
    this.configVilleVisite = {
      observer: true,
      slidesPerView: 3,
      spaceBetween: 0,
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
        }

      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
    }

  }


  sendFormulaire() {

  }
}
