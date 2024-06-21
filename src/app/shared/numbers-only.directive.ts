import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'input[numbersOnly]',
  standalone: true
})
export class NumberDirective {
  constructor(private _el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event:any) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9]{1,4}/g, '');
    if (this._el.nativeElement.value.length > 3) {
        this._el.nativeElement.value = this._el.nativeElement.value.substring(0, 4);
      }
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}

