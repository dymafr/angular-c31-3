import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appDrag]',
})
export class DragDirective {
  @HostBinding('draggable') public draggable = true;
  @HostBinding('class.over') public isIn = false;
  @Input('index') public index!: number;
  @Output() public switch: EventEmitter<{
    srcIndex: number;
    dstIndex: number;
  }> = new EventEmitter();

  @HostListener('dragstart', ['$event']) dragStart(event: DragEvent) {
    event.dataTransfer?.setData('srcIndex', this.index.toString());
  }

  @HostListener('dragenter') dragEnter() {
    this.isIn = true;
  }

  @HostListener('dragleave') dragLeave() {
    this.isIn = false;
  }

  @HostListener('dragover', ['$event']) dragOver(event: DragEvent) {
    event.preventDefault();
  }

  @HostListener('drop', ['$event']) drop(event: DragEvent) {
    this.isIn = false;
    this.switch.emit({
      srcIndex: Number(event.dataTransfer!.getData('srcIndex')),
      dstIndex: this.index,
    });
  }

  constructor() {}
}
