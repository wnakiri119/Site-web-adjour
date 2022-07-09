import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Expedition} from "../../_model/expedition";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormControl} from "@angular/forms";
import {Utilisateur} from "../../_model/utilisateur";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppSettingService} from "../../services/app-setting.service";
import {USER_FIND_ALL__GET} from "../../_api_config/route-api";
import {Adresse} from "../../_model/adresse";
import {AdressAddComponent} from "../../shared/modal/adress-add/adress-add.component";
import {MatDialog} from "@angular/material/dialog";
import {UserViewDetailComponent} from "../../shared/modal/user-view-detail/user-view-detail.component";

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {

  displayColumns: string[] = ['id', 'name', 'surname','created','updated', 'sexe', 'email', 'roles','action'];
  dataSource: MatTableDataSource<Utilisateur> = new MatTableDataSource<Utilisateur>();

  // pagination deuxième tableau

  /*------- pagination -------------------------------*/
  public totalItem: number;
  page = 0;
  private size: number = 25;
  pageEvent: PageEvent;
  /*------------------ fin -----------------------------*/
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;



  constructor(private http: HttpClient,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private appSettings: AppSettingService) { }

  ngOnInit(): void {
    this.userFindAll();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setPage(e: PageEvent): PageEvent {
    if (this.page != e.pageIndex) {
      this.size = e.pageSize;
      this.page = e.pageIndex;
      this.userFindAll();
    }


    return e;
  }


  seeDetail(adresse: Adresse) {
    if(!adresse) {
      adresse = new Adresse();
    }

    let dialog = this.dialog.open(UserViewDetailComponent, {
      width: '900px',
      data: adresse,
      disableClose: true
    });

    dialog.afterClosed().subscribe(data => {
      if(data) {
        this.userFindAll();

      }

    })
  }

  userFindAll() {
    this.http.get<any>(`${USER_FIND_ALL__GET}page=${this.page}&size=${this.size}`).subscribe(data=>{
      this.totalItem = data.totalElements;
      this.dataSource.data = data.content;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
}
