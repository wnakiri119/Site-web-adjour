import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, UrlSegment} from "@angular/router";

@Component({
  selector: 'app-menu-router',
  templateUrl: './menu-router.component.html',
  styleUrls: ['./menu-router.component.scss']
})
export class MenuRouterComponent {

  public pageTitle:string;
  public breadcrumbs: {
    name: string;
    url: string[]
  }[] = [];

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public title:Title,){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.breadcrumbs = [];
        this.parseRoute(this.router.routerState.snapshot.root);
        this.pageTitle = "";
        this.breadcrumbs.forEach(breadcrumb => {
          this.pageTitle += ' > ' + breadcrumb.name;
        }) ;
        this.title.setTitle(this.pageTitle);
      }
    })
  }

  private parseRoute(node: ActivatedRouteSnapshot) {
    if (node.data['path']) {
      if(node.url.length){
        let urlSegments: UrlSegment[] = [];
        node.pathFromRoot.forEach(routerState => {
          urlSegments = urlSegments.concat(routerState.url);
        });
        let url = urlSegments.map(urlSegment => {
          return urlSegment.path;
        }).join('/');

        const pathArray = url.split('/');
        const paramLength = pathArray.length;
        pathArray[0]='/'+pathArray[0];


        if(paramLength > 1 || node.params.code){
          this.breadcrumbs.push({
            name: node.params.code? node.params.code:pathArray[paramLength - 1],
            url: pathArray
          })
        }else{
          this.breadcrumbs.push({
            name: node.data['path'],
            url: pathArray
          })
        }
      }
    }
    if (node.firstChild) {
      this.parseRoute(node.firstChild);
    }
  }

  /*public closeSubMenus(){
    if(window.innerWidth < 960){
      this.sidenavMenuService.closeAllSubMenus();
    }
  }*/

  splitUrl(url: string): string[] {
    const urlSplit = url.split('/');
    urlSplit.splice(0,1);
    urlSplit[0]='/'+urlSplit[0];
    return urlSplit;
  }
}
