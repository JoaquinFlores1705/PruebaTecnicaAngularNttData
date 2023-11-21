import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColumnInterface } from 'src/app/shared/models/column-interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  select: number = 5;
  @Input() columnsHeader:string[] = [];
  @Input() rowValuesMap: ColumnInterface[][] = [];
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() changeResults = new EventEmitter<Number>();

  ngOnInit(){

  }

  clearSubMenus(id:string = ""){
    let elementsMore = document.querySelectorAll("[class^='action-id-']")
    elementsMore.forEach((e) => {
      if(!e.classList.contains(`action-id-${id}`) || id == "")
        e.classList.add("hidden")
    })
  }

  moreOptions(id:string){
    this.clearSubMenus(id);
    let elementMore = document.querySelector(`.action-id-${id}`)
    if(elementMore!.classList.contains("hidden"))
      elementMore!.classList.remove('hidden')
    else
      elementMore!.classList.add('hidden')
  }

  Edit(id:string){
    this.edit.emit(id);
  }

  Delete(id:string){
    this.clearSubMenus();
    this.delete.emit(id);
  }

  ChangeResults(number:Number){
    this.changeResults.emit(number);
  }
}
