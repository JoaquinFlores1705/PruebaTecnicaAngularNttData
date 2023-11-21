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

  moreOptions(id:string){
    let elementsMore = document.querySelectorAll("[class^='action-id-']")
    console.log(elementsMore)
    elementsMore.forEach((e) => {
      if(!e.classList.contains(`action-id-${id}`))
        e.classList.add("hidden")
    })
    let elementMore = document.querySelector(`.action-id-${id}`)
    console.log(elementMore)
    if(elementMore!.classList.contains("hidden"))
      elementMore!.classList.remove('hidden')
    else
      elementMore!.classList.add('hidden')
  }

  Edit(id:string){
    this.edit.emit(id);
  }

  Delete(id:string){
    this.delete.emit(id);
  }

  ChangeResults(number:Number){
    this.changeResults.emit(number);
  }
}
