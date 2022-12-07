import { Directive, HostBinding, HostListener, Input, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  @HostBinding('draggable') public draggable = true;
  @HostBinding('class.over') public isIn = false;
  @Input('index') public index;
  @Output() public switch: EventEmitter<{ srcIndex: number, dstIndex: number }> = new EventEmitter();

  @HostListener('dragstart', ['$event']) dragStart(event) {
    event.dataTransfer.setData('srcIndex', this.index);
  }

  @HostListener('dragenter') dragEnter() {
    this.isIn = true;
  }

  @HostListener('dragleave') dragLeave() {
    this.isIn = false;
  }

  @HostListener('dragover', ['$event']) dragOver(event) {
    event.preventDefault();
  }

  @HostListener('drop', ['$event']) drop(event){
    this.isIn = false;
    this.switch.emit({ srcIndex: event.dataTransfer.getData('srcIndex'), dstIndex: this.index });
  }


  constructor() { }

}