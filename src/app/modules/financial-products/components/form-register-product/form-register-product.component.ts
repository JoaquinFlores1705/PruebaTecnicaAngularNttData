import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, AsyncValidatorFn, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { FinancialProductsService } from 'src/app/core/services/financial-products.service';
import { FinancialProduct } from 'src/app/shared/models/financial-product-model';

@Component({
  selector: 'app-form-register-product',
  templateUrl: './form-register-product.component.html',
  styleUrls: ['./form-register-product.component.css']
})
export class FormRegisterProductComponent {
  registerForm!: FormGroup;
  id!: FormControl;
  name!: FormControl;
  description!: FormControl;
  logo!: FormControl;
  date_release!: FormControl;
  date_revision!: FormControl;
  update: boolean = false;
  errorsMap: string[] = [];
  @Input() product!:FinancialProduct;
  @Output() registerProductEvent = new EventEmitter<FinancialProduct>();

  constructor(private financialService: FinancialProductsService){

  }

  ngOnInit(){
    this.id = new FormControl(this.product.id, [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ],[this.validatorVerificateId()]);
    this.name = new FormControl(this.product.name, [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),]);
    this.description = new FormControl(this.product.description,[Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200),]);
    this.logo = new FormControl(this.product.logo,[Validators.required])
    this.date_release = new FormControl(this.product.date_release,[Validators.required, this.validatorDate()]);
    this.date_revision = new FormControl(this.product.date_revision,[Validators.required]);
    this.registerForm = new FormGroup({
      id: this.id,
      name: this.name,
      description: this.description,
      logo: this.logo,
      date_release: this.date_release,
      date_revision: this.date_revision,
    });

    this.date_release.valueChanges.subscribe(
      (value: string) => {
        let arrayDate: string[] = value.split('-');
        let year: number = parseInt(arrayDate[0]);
        let month: number = parseInt(arrayDate[1]);
        let day: number = parseInt(arrayDate[2]);
        let dateMoreOneYear:Date = new Date(year + 1, month - 1, day);
        this.date_revision.setValue(this.dateToString(dateMoreOneYear));
      }
    );

  }

  dateToString(date: Date): string{
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`;
  }

  validatorVerificateId(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{idRepeat: boolean;} | null> => {
      return this.financialService.verify(control.value).pipe(
          map((result: boolean) => {
            return result ? { idRepeat: true }  : null
          }
        ));
    }
  };

  validatorDate(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

      console.log(this.product)

      let value = control.value;
      if(value == "")
        return null;

      let arrayDate: string[] = value.split('-');
      let year: number = parseInt(arrayDate[0]);
      let month: number = parseInt(arrayDate[1]);
      let day: number = parseInt(arrayDate[2]);
      let today: Date = new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate());
      let dateValue:Date = new Date(year, month - 1, day);
      return dateValue < today? { dateInvalid: true } : null;
    }

  };

  sendForm(){
    this.product = this.registerForm.value;
    this.registerProductEvent.emit(this.product);
  }

  updateProduct(product : FinancialProduct){
    this.product = product;
    this.update = true;
    this.registerForm.get('id')?.clearAsyncValidators();
    this.registerForm.setValue(product);
    this.registerForm.updateValueAndValidity();
    this.registerForm.markAllAsTouched();
  }

  reset() {
    this.registerForm.setValue(this.product);
    this.registerForm.markAllAsTouched();
  }
}
