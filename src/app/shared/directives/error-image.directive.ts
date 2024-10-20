import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[errorImage]',
  standalone: true
})
export class ErrorImageDirective {

  @Input() errorImage: string = '';

  constructor() { }

  @HostListener('error') onError() {
    if (!event)
      return;
    const element = (event.target as HTMLImageElement);
    element.src = this.errorImage || 'assets/default-image.png'; // Asignar imagen por defecto
  }

}
