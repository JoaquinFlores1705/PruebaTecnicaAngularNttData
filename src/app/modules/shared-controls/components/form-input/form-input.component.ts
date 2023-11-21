import { Component, ElementRef, Input, ViewChild, AfterViewInit, OnChanges, forwardRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl,ControlValueAccessor } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormInputComponent),
  multi: true
};

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent implements ControlValueAccessor, AfterViewInit, OnChanges {

  //The internal data model for form control value access
  private innerValue: any = '';
  @Input() idHtml: string = "";
  @Input() nameHtml: string = "";
  @Input() class: string = "";
  @Input() type: string = "text";
  @Input() placeholder:string= "";
  @Input() control:FormControl = new FormControl();
  @Input() readonly: boolean = false;
  @Input() error: any;
  @ViewChild('input')  inputRef!:ElementRef;

  ngAfterViewInit(){
      // RESET the custom input form control UI when the form control is RESET
      this.control.valueChanges.subscribe(
          () => {
              // check condition if the form control is RESET
              if (this.control.value == "" || this.control.value == null || this.control.value == undefined) {
                  this.innerValue = "";
                  this.inputRef.nativeElement.value = "";
              }
          }
      );
  }

  ngOnChanges(){

  }

  onChange(e:Event, value:any){
    console.log(value);
    console.log('e',this.error);
      //set changed value
      this.innerValue = value;
      // propagate value into form control using control value accessor interface
      this.propagateChange(this.innerValue);
  }

  //get accessor
  get value(): any {
      return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
      if (v !== this.innerValue) {
          this.innerValue = v;
      }
  }

  //propagate changes into the custom form control
  propagateChange = (_: any) => { }

  writeValue(value: any) {
      this.innerValue = value;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
      this.propagateChange = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {

  }

}
