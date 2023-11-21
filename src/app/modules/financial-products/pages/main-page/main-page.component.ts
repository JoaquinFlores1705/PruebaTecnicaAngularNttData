import { Component } from '@angular/core';
import { FinancialProductsService } from 'src/app/core/services/financial-products.service';
import { FinancialProduct } from 'src/app/shared/models/financial-product-model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  columnsHeader:string[] = [];
  rowValuesMap: Map<string, any>[] = [];
  products:FinancialProduct[] = [];
  searchText: string = "";
  error: string = "";

  constructor(private financialService: FinancialProductsService, private router: Router){

  }

  ngOnInit(){
    this.columnsHeader = ['Logo','Nombre del producto','Descripción','Fecha de liberación','Fecha de reestrucutaración'];
    this.financialService.get().subscribe({
      next: this.responseGetSucessfull.bind(this),
      error: this.responseGetError.bind(this)
    });
  }

  ChangeResults(searchText: string){
    this.searchText = searchText;
    this.rowValuesMap = this.products.filter((f) => f.id!.toUpperCase().includes(this.searchText.toUpperCase()) || f.name.toUpperCase().includes(this.searchText.toUpperCase()) || f.description.toUpperCase().includes(this.searchText.toUpperCase()))
    .map((p: FinancialProduct) => {
      let productMap = new Map<string, string>();
      productMap.set("id",p.id!);
      productMap.set("img",p.logo!);
      productMap.set("text",p.description);
      productMap.set("text",p.date_release!);
      productMap.set("text",p.date_revision!);
      return productMap;
    });
  }

  ChangeNumberResults(number: Number){

  }

  responseGetSucessfull(data: FinancialProduct[]){
    this.products = data.map((d) => {
      d.date_release = d.date_release!.substring(0,10);
      d.date_revision = d.date_revision!.substring(0,10);
      return d;
    });
    this.ChangeResults(this.searchText);
  }

  responseGetError(data:HttpErrorResponse){
    console.log(data);
    this.error = "";
    this.error = data.error;
  }

  EditProduct(id:string){
    this.router.navigate(['/registro/edicion', id]);
  }

  DeleteProduct(id:string){
    this.financialService.delete(id).subscribe({
      next: this.responseDeleteSucessfull.bind(this),
      error: this.responseDeleteError.bind(this)
    });
  }

  responseDeleteSucessfull(data: string){
    this.error = "";
    this.ngOnInit();
  }

  responseDeleteError(data:HttpErrorResponse){
    console.log(data);
    this.error = "";
    this.error = data.error;
  }

}
