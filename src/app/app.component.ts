import { Component } from '@angular/core';
import { List } from './shared/models';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public listLabel = "";
  public lists: List[] = [];

  public itemContent = "";

  public addList() {
    if (this.listLabel) {
      this.lists.push({
        label: this.listLabel,
        items: []
      });
    }
    this.listLabel = "";
  }

  public addItem(list: List) {
    if (this.itemContent) {
      list.items.push({
        content: this.itemContent
      });
    }
    this.itemContent = "";
  }

  public switchItems($event: { srcIndex: number, dstIndex: number }) {
    const tmp = this.lists[0].items[$event.srcIndex];
    this.lists[0].items[$event.srcIndex] = this.lists[0].items[$event.dstIndex];
    this.lists[0].items[$event.dstIndex] = tmp;
  }
 
}