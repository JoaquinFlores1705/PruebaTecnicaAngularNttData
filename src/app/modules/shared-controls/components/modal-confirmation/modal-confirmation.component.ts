import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.css']
})
export class ModalConfirmationComponent {
  confirmn : boolean = false;
  @Input() public id:string = '';
  @Output() result = new EventEmitter<string>();

  constructor() { }

  confirm(){
    this.result.emit(this.id);
  }

  cancel(){
    this.result.emit("");
  }

}
