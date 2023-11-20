import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Input() searchText: string = "";
  @Output() search = new EventEmitter<string>();

  keyup(){
    this.search.emit(this.searchText);
  }

}
