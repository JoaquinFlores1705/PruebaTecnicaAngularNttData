import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input() classAdd:string = '';
  @Input() type:string = 'submit';
  @Input() disabled:boolean = false;
  @Input() text:string = 'Enviar';
  @Output() clickButton = new EventEmitter();


  click(){
    this.clickButton.emit();
  }

}
