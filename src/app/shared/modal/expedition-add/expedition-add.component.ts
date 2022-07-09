import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgxSpinnerService} from "ngx-spinner";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Expedition} from "../../../_model/expedition";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Agence} from "../../../_model/agence";
import {
  AGENCE_FIND_ALL__GET,
  AGENCE_FIND_BY_VILLE,
  COLIS_FIND_BY_PERIODE_AND_AGENCE__POST
} from "../../../_api_config/route-api";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {DatePipe} from "@angular/common";
import {ExpeditionSaveModalComponent} from "../expedition-save-modal/expedition-save-modal.component";

@Component({
  selector: 'app-expedition-add',
  templateUrl: './expedition-add.component.html',
  styleUrls: ['./expedition-add.component.scss'],

})
export class ExpeditionAddComponent implements OnInit {
  private isUpdate=false;

  /*============== datasource ======================*/
  agencesDepart: Agence[];
  agencesArrive: Agence[];
  colisIds:string[]=[];

  /*============== form =====================*/
  formGroup: FormGroup;

  /*============== paginate =================*/
  page=0;
  size=25;
  totalItem=0;
  pageEventColis: PageEvent;


  dataSource: MatTableDataSource<Expedition> = new MatTableDataSource<Expedition>();
  displayedColumnsColis: string[] = ['code', 'name', 'poids', 'nature','valeur','propretaire','destinataire','dateLastUpdate','montant','quantity','total', 'action'];
  @ViewChild(MatPaginator, {static: true})  pagination: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              private snackBer: MatSnackBar,
              private datePipe: DatePipe,
              private spinner: NgxSpinnerService,
              private dialogRef: MatDialogRef<ExpeditionAddComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public expedition: Expedition) { }

  ngOnInit(): void {
    //on enl_ve les info inutiles
    this.expedition.dateCreated=null;
    this.expedition.dateLastUpdate=null;

    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const firstDayValue = this.datePipe.transform(startDate, 'yyyy-MM-dd');
    const lastDayValue = this.datePipe.transform(endDate, 'yyyy-MM-dd');
    this.formGroup = this.formBuilder.group({
      agencesSource: ['', Validators.required],
      agencesDestination: ['', Validators.required],
      from: [firstDayValue, Validators.required],
      till: [lastDayValue, Validators.required]
    });

    this.agenceFindAll();
    this.agenceFindDepart();
  }


  close() {
    this.dialogRef.close(this.isUpdate);
  }

  agenceFindAll() {
    this.http.get<any>(`${AGENCE_FIND_ALL__GET}page=0&size=200`).subscribe(data=>{
      this.agencesArrive = data.content;
    })
  }

  agenceFindDepart() {
    this.http.get<any>(`${AGENCE_FIND_BY_VILLE}`).subscribe(data=>{
      this.agencesDepart = data;
    })
  }


  findColis() {
    if(this.formGroup.invalid)
      return;

    /**
     * le backend attend 3 agence sources et 5 agences de destinations
     * donc on range les deux tableau avant de pousser
     */
    const sizeAgenceSource = (this.formGroup.controls.agencesSource.value as any[]).length;
    const sizeAgenceDestination = (this.formGroup.controls.agencesDestination.value as any[]).length;
    if(sizeAgenceSource<3){
      for (let i = sizeAgenceSource; i < 3; i++) {
        this.formGroup.controls.agencesSource.value[i]='0';
      }
    }

    if(sizeAgenceDestination<5){
      for (let i = sizeAgenceDestination; i < 5; i++) {
        this.formGroup.controls.agencesDestination.value[i]='0';
      }
    }

    this.spinner.show();

    this.http.post<any>(`${COLIS_FIND_BY_PERIODE_AND_AGENCE__POST}`, this.formGroup.value).subscribe(data=>{
      this.totalItem = data.totalElements;
      this.dataSource.data = data.content;
      this.dataSource.paginator = this.pagination;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
    })

  }

  setPageColis(e: PageEvent): PageEvent {
    if (e.pageIndex != this.page) {
      this.size = e.pageSize;
      this.page = e.pageIndex;

      this.findColis();
    }

    return e;
  }

  checkAll(event: MatCheckboxChange) {
    this.colisIds = [];

    const checkeds = document.querySelectorAll('.to-do');
    if (event.checked) {
      this.dataSource.data.forEach(c=>{
        this.colisIds.push(c.id);
      });

      checkeds.forEach((e: Element)=>{
        e.querySelectorAll('input[value]').forEach((input: HTMLInputElement)=>{
          input.setAttribute('aria-checked', 'true')
        })
        //console.log(e);
        if(!e.classList.contains('mat-checkbox-checked'))
          e.classList.add('mat-checkbox-checked')
      });
    } else {
      checkeds.forEach((e: HTMLInputElement)=>{
        e.querySelectorAll('input[value]').forEach((input: HTMLInputElement)=>{
          input.setAttribute('aria-checked', 'false')
        })
        //console.log(e);
        if(e.classList.contains('mat-checkbox-checked'))
          e.classList.remove('mat-checkbox-checked')
      });
    }
  }

  check(event: MatCheckboxChange) {
    if (event.checked && this.colisIds.indexOf(event.source.value)<0) {
      this.colisIds.push(event.source.value);
    }
    else if(!event.checked){
      this.colisIds = this.colisIds.filter(id=> id!=event.source.value);
    }
  }


  expeditionOpenDoSave() {
    if (this.colisIds.length == 0) {
      this.snackBer.open('veillez sélectioner au moins un article', 'x', {
        horizontalPosition: "right",
        verticalPosition: "top",
        duration: 10000,
        panelClass: 's-warning'
      });
      return;
    }

    this.expedition.colisId = this.colisIds;
    const dialogRef = this.dialog.open(ExpeditionSaveModalComponent, {
      data: this.expedition,
      width: '500px',
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data=>{
      this.isUpdate = data;
    })
  }
}
