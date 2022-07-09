import {AfterViewInit, Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {AppSettingService} from "../../../services/app-setting.service";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit, AfterViewInit, OnDestroy {

  massages = [
    {icon:'commute', value:'survived not only'},
    {icon:'fingerprint', value:'There are many variation'},
    {icon:'commute', value:' passage of Lorem Ipsum, you'},
    {icon:'drafts', value:'to generate Lorem Ipsum which'},

  ]

  message=this.massages[0];
  private intervale;
  //controle show and disable message
  private intervaleState;
  show=true;

  listening;
  lastPositionScrollBar=0;
  constructor(public appSettings: AppSettingService,
              public authService: AuthenticationService,
              private router: Router,
              private rendered: Renderer2) { }


  ngAfterViewInit(): void {
        this.doAnimation();
        this.setFade();
        this.afficheMessage();

    }

  ngOnInit(): void {

  }


  logOut() {
    this.authService.logOut();
    this.router.navigate(['/sign-in'])
  }


  afficheMessage() {


    const info = document.getElementById('info');
    info.addEventListener('mouseenter', ()=>{
        clearInterval(this.intervale);
        clearInterval(this.intervaleState);
    });

    info.addEventListener('mouseout', ()=>{
      //set message
      this.doAnimation();
      //set fade
      this.setFade();
    })
  }

  doAnimation() {
    let i =1;
    this.intervale = setInterval(()=>{
      this.message = this.massages[i];
      if(i==this.massages.length-1)
        i=0;
      else i++;
    }, 5000);
  }

  setFade() {
    this.intervaleState = setInterval(()=>{
      this.show = !this.show;
    },4500);
  }

  ngOnDestroy(): void {

  }
}
