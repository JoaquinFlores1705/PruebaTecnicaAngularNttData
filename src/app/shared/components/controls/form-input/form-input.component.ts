import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent {

  @Input() idHtml: string = "";
  @Input() nameHtml: string = "";
  @Input() class: string = "";
  @Input() type: string = "text";
  @Input() readonly: boolean = false;
  @Input() showErrors: boolean = false;
  @Input() errorsMap: string[] = [];

}
