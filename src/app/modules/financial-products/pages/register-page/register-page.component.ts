import { Component, ViewChild } from '@angular/core';
import { FormRegisterProductComponent } from '../../components/form-register-product/form-register-product.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FinancialProduct } from 'src/app/shared/models/financial-product-model';
import { FinancialProductsService } from 'src/app/core/services/financial-products.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  @ViewChild(FormRegisterProductComponent) registerProduct!: FormRegisterProductComponent;


  update: boolean = false;
  product : FinancialProduct= {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: ''
  };
  error: string = "";

  constructor(private financialService: FinancialProductsService,
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(){
    if(this.route.snapshot.paramMap.get('id') != null){

      this.financialService.get().subscribe({
        next: ((result: FinancialProduct[]) => {
          this.product = result.find(r => r.id == this.route.snapshot.paramMap.get('id')) ?? this.product;
          this.product.date_release = this.product.date_release!.substring(0,10);
          this.product.date_revision = this.product.date_revision!.substring(0,10);
          this.registerProduct.updateProduct(this.product);
          this.update = true;
        })
      });
    }
  }

  addProduct(product: FinancialProduct){
    this.financialService.create(product).subscribe({
      next: this.responseCreateSucessfull.bind(this),
      error: this.responseCreateError.bind(this)
    });
  }

  responseCreateSucessfull(data: FinancialProduct){
    console.log(data)
    this.error = "";
    this.router.navigate(['/']);
  }

  responseCreateError(data:HttpErrorResponse){
    console.log(data);
    this.error = data.error;
  }

  updateProduct(product: FinancialProduct){
    this.financialService.update(product).subscribe({
      next: this.responseCreateSucessfull.bind(this),
      error: this.responseUpdateError.bind(this)
    });
  }

  responseUpdateSucessfull(data: FinancialProduct){
    console.log(data);
    this.error = "";
    this.router.navigate(['/']);
  }

  responseUpdateError(data:HttpErrorResponse){
    console.log(data);
    this.error = data.error;
  }
}
